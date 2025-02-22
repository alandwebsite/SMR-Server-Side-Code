try {
    document.getElementById("03d").value = localstorage.getItem("ip");
} 
catch(err) {
    console.log(err.name);
}
try {
    document.getElementById("03e").value = localstorage.getItem("port");
} 
catch(err) {
    console.log(err.name);
}
try {
    document.getElementById("03f").value = localstorage.getItem("pass");
} 
catch(err) {
    console.log(err.name);
}


function startConnecting() {
    obs = new OBSWebSocket();

    var ip = document.getElementById("03d").value
    console.log("Chosen IP Address:" + ip );
    localstorage.setItem("ip", ip);
    var port = document.getElementById("03e").value
    localstorage.setItem("port", port);
    console.log("Chosen Port:" + port);
    var pass = document.getElementById("03f").value;
    localstorage.setItem("pass", pass);
    console.log("Chosen Password:" + pass);


    obs.connect({ address: ip + ":" + port, password: pass })
    .then(() => {
        console.log("connected successfully");
        return obs.send('GetSceneItemProperties', {
            'item': "0"
        });
    })
    .then(data => {
        prop0 = data;

        return obs.send('GetSceneItemProperties', {
            'item': "1"
        });



    })
    .then(datt => {
        prop1=datt;
        console.log(prop0);
        console.log(prop1);
        swapSourceProperties(prop0, prop1);




    })
    .then(data =>{

    })
    .catch(err => {
        console.log(err);
    });
    
    obs.on('error', err=> {
        console.error('socket error:', err)
    });
}

function swapSourceProperties(propx, propy) {
    obs.send('SetSceneItemProperties', {
        "item": propx.name,
        "position": {
            "x":propy.position.x,
            "y":propy.position.y, 
            "alignment":propy.position.alignment
        },
        "rotation": propy.rotation,
        "scale": {
            "x":propy.scale.x,
            "y":propy.scale.y
        },
        "crop": {
            "top": propy.crop.top,
            "bottom": propy.crop.bottom,
            "left": propy.crop.left,
            "right": propy.crop.right
        },
        "visible": propy.visible,
        "locked": propy.locked,
        "bounds": {
            "type":propy.bounds.type,
            "alignment":propy.bounds.alignment,
            "x": propy.bounds.x,
            "y": propy.bounds.y
        }
    });
    obs.send('SetSceneItemProperties', {
        "item": propy.name,
        "position": {
            "x":propx.position.x,
            "y":propx.position.y, 
            "alignment":propx.position.alignment
        },
        "rotation": propx.rotation,
        "scale": {
            "x":propx.scale.x,
            "y":propx.scale.y
        },
        "crop": {
            "top": propx.crop.top,
            "bottom": propx.crop.bottom,
            "left": propx.crop.left,
            "right": propx.crop.right
        },
        "visible": propx.visible,
        "locked": propx.locked,
        "bounds": {
            "type":propx.bounds.type,
            "alignment":propx.bounds.alignment,
            "x": propx.bounds.x,
            "y": propx.bounds.y
        }
    });
}

