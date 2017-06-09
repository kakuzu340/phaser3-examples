var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    state: {
        preload: preload,
        create: create,
        update: update
    }
};

var controls;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tiles', 'assets/tilemaps/tiles/dangerous-kiss-x2.png');
    this.load.json('map', 'assets/tilemaps/maps/dangerous-kiss.json');
}

function create ()
{
    var mapData = this.cache.json.get('map').layers[0].data;

    //  Offset by 1 (because Tiled for some reason exports starting from 1 not zero)

    mapData.forEach(function (current, index, array) {
        mapData[index] = current - 1;
    });

    this.add.staticTilemap(mapData, 0, 0, 16, 16, 192, 154, 'tiles');

    var cursors = this.input.keyboard.createCursorKeys();

    // var controlConfig = {
    //     camera: this.cameras.main,
    //     left: cursors.left,
    //     right: cursors.right,
    //     up: cursors.up,
    //     down: cursors.down,
    //     speed: 0.5
    // };

    // controls = this.cameras.addKeyControl(controlConfig);

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.04,
        drag: 0.0005,
        maxSpeed: 0.7
    };

    controls = this.cameras.addSmoothedKeyControl(controlConfig);

    this.cameras.main.setBounds(0, 0, 2272, 1864);

}

function update (time, delta)
{
    controls.update(delta);
}
