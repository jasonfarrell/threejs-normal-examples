window.Background = (function(win, $) {

    var $el;
    var Three = this.THREE;
    var camera;
    var debouncer;
    var renderer;
    var scene;
    var standStill = true;

    function init($element) {
        var STARS = 600;
        var i;
        var point;

        $el = $element;
        setupBaseScene();
        addLights();

        for (i = 0; i < STARS; i = i + 1) {
            point = addPoint(0xffffff, 2, 3, 3);
            point.position.x = getRandomArbitrary(-400, 400);
            point.position.y = getRandomArbitrary(-20, -1000);
            point.position.z = getRandomArbitrary(-400, 100);
        }

        update();
        render();
    }

    function setupBaseScene() {
        var ASPECT = win.innerWidth / win.innerHeight;
        var FAR = 1000;
        var FOV = 45;
        var NEAR = 0.1;

        scene = new Three.Scene();
        camera = new Three.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
        renderer = new Three.WebGLRenderer({antialias: true});
        renderer.setClearColor(0x000000);
        renderer.shadowMapEnabled = true;
        renderer.setSize(win.innerWidth, win.innerHeight);
        $el.append(renderer.domElement);

        //-- Pull the camera up 120 and outwards 300:
        camera.position.x = 0;
        camera.position.y = -120;
        camera.position.z = 300;
    }

    function addLights() {
        var light = new Three.PointLight(0xffffff);
        light.intensity = 3;
        light.position.x = 500;
        light.position.y = 500;
        light.position.z = 500;
        scene.add(light);
    }

    function render() {
        if (!standStill) {
            //-- http://aws.amazon.com/publicdatasets/
            renderer.render(scene, camera);
        }
    }

    function addPoint(color, radius, widthSegments, heightSegments) {
        var geometry;
        var material;
        var shape;

        geometry = new Three.SphereGeometry(radius, widthSegments, heightSegments);
        material = new Three.MeshLambertMaterial({
            emissive: 0x000000,
            color: color,
            transparent: true,
            opacity: 0.8
        });

        shape = new Three.Mesh(geometry, material);
        scene.add(shape);

        return shape;
    }

    function update() {
        var MAX_CAM = 120;
        var MIN_CAM = -120;
        var scrollPercentage;

        standStill = false;

        debouncer = clearTimeout(debouncer);
        debouncer = setTimeout(function() {
            standStill = true;
        }, 100);

        scrollPercentage = $(win).scrollTop() / $(win).height();
        camera.position.y = -(MAX_CAM - MIN_CAM) * scrollPercentage + MIN_CAM;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    return {
        init: init,
        update: update,
        render: render
    };

})(window, this.jQuery);
