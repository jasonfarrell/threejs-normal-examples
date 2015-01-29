window.Cta = (function(win, $, TweenMax, THREEx) {

    var $el;
    var Three = this.THREE;
    var camera;
    var domEvents;
    var light;
    var renderer;
    var scene;
    var shape;

    function init($element) {
        $el = $element;
        setupBaseScene();
        light = addLights();

        domEvents = new THREEx.DomEvents(camera, renderer.domElement);

        shape = addPoint(0xffffff, 50, 124, 124);
        render();

        domEvents.addEventListener(shape, 'click', function(event) {
            var AN_TIME = 0.15;
            TweenMax.to(shape.scale, AN_TIME, {x: 1.4, y: 1.4, z: 1.4});
            TweenMax.to(shape.scale, AN_TIME, {x: 1, y: 1, z: 1, delay: AN_TIME});
        }, false);
        domEvents.addEventListener(shape, 'mouseover', function(event) {
            var AN_TIME = 0.45;
            TweenMax.to(shape.material, AN_TIME, {opacity: 1});
        }, false);
        domEvents.addEventListener(shape, 'mouseout', function(event) {
            var AN_TIME = 0.45;
            TweenMax.to(shape.material, AN_TIME, {opacity: 0.3});
        }, false);
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
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 300;

        window.cam = camera;
    }

    function addLights() {
        var light = new Three.AmbientLight(0xffffff);
        light.position.x = 0;
        light.position.y = 0;
        light.position.z = 500;
        scene.add(light);
        return light;
    }

    function addPoint(color, radius) {
        var DETAIL = 0;
        var geometry;
        var material;
        var shape;

        geometry = new Three.DodecahedronGeometry(radius, DETAIL);
        material = new Three.MeshPhongMaterial({
            emissive: 0x000000,
            color: color,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });

        shape = new Three.Mesh(geometry, material);

        scene.add(shape);

        return shape;
    }

    function render() {
        if (typeof shape === 'object') {
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
    }

    return {
        init: init,
        render: render
    };

})(window, this.jQuery, this.TweenMax, this.THREEx);
