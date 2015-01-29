window.Title = (function(win, $, TweenMax, THREEx) {

    var $el;
    var Three = this.THREE;
    var camera;
    var isFinished = false;
    var offset = {x: 0, y: 0};
    var renderer;
    var scene;

    function init($element) {
        $el = $element;
        setupBaseScene();
        addLights();
        $('.headline').hide();
        setTimeout(function() {
            getPhraseCoords($('.headline').text());
        }, 400);

        render();
    }

    function getPhraseCoords(phrase) {
        var canvas = document.createElement('canvas');
        var ctx;
        var cube;
        var i;
        var imageData;
        var lastX;
        var material;
        var point;
        var resolution = 2;
        var x;
        var y;
        var yPlotted;

        //clearScene();

        canvas.width = 400;
        canvas.height = 400;

        ctx = canvas.getContext('2d');
        ctx.font = '60px Helvetica';
        ctx.fillText(phrase, 10, 50);
        imageData = ctx.getImageData(0, 0, 400, 400);
        for (x = 0; x < imageData.width; x += resolution) {
            for (y = 0; y < imageData.height; y += resolution) {
                i = (y * imageData.width + x) * 4;
                if (imageData.data[i + 3] !== 0) {

                    yPlotted = y * -1;
                    cube = addPoint(randomColor(), 12, 12, 15);
                    point = cube.mesh;
                    material = cube.material;
                    //point.position.set(Math.random() * 500, -Math.random() * 500, Math.random() * 500);
                    point.position.set(Math.random() * 500, -Math.random() * 500, Math.random() * 500);
                    point.rotation.x = Math.random() * 360;

                    new TweenMax(material, 1, {opacity: 0.6, delay: 1});

                    new TweenMax(point.position, 1, {
                        x: offset.x + (x * 3),
                        y: yPlotted * 3,
                        z: Math.random() * 10,
                        delay: 1
                    });
                    lastX = offset.x + (x * 3);
                }
            }
        }
        setTimeout(finished, 3000);
        offset.x = lastX;
        camera.position.x = lastX / 2 + 20;

    }

    function setupBaseScene() {
        var ASPECT = $el.innerWidth() / $el.innerHeight();
        var FAR = 1000;
        var FOV = 45;
        var NEAR = 0.1;

        scene = new Three.Scene();
        camera = new Three.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
        renderer = new Three.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.shadowMapEnabled = true;
        renderer.setSize($el.innerWidth(), $el.innerHeight());
        $el.append(renderer.domElement);

        //-- Pull the camera up 120 and outwards 300:
        camera.position.x = 300;
        camera.position.y = -100;
        camera.position.z = 400;
    }

    function addLights() {
        var light = new Three.PointLight(0xffffff);
        light.intensity = 3;
        scene.add(light);
        return light;
    }

    function addPoint(color, w, h, d) {
        var geometry;
        var material;
        var shape;

        geometry = new Three.SphereGeometry(w, 1, 1);
        material = new Three.MeshLambertMaterial({
            emissive: 0x000000,
            color: color,
            transparent: true,
            opacity: 0.0
        });

        shape = new Three.Mesh(geometry, material);

        scene.add(shape);

        return {
            material: material,
            mesh: shape
        };
    }

    function finished() {
        isFinished = true;
    }

    function randomColor() {
        return '#' + (function co(lor) {
            return (lor +=
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) &&
        (lor.length === 6) ?  lor : co(lor);
        })('');
    }

    function render() {
        if (!isFinished) {
            renderer.render(scene, camera);
        }
    }
    return {
        init: init,
        render: render
    };

})(window, this.jQuery, this.TweenMax, this.THREEx);
