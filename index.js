var nodes = null;
var edges = null;
var network = null;
var elemTooltip = null;

var
    WIDTH_SCALE = 2,
    GRAY = 'gray';

function draw(jsonData) {
    nodes = [];
    edges = [];

    jsonData.nodes.forEach(function (node) {
        nodes.push({id: node.unique_name, label: node.unique_name, group: node.group, value: 5});
    });

    jsonData.nodes.forEach(function (node) {
        node.dependences.forEach(function (nodeDepend) {
            edges.push({from: node.unique_name, to: nodeDepend.unique_name, length: 150, width: WIDTH_SCALE, label: nodeDepend.connection_type});
        });
    });

    // edges.push({from: 1, to: 3, length: LENGTH_MAIN, width: WIDTH_SCALE * 4, label: '0.55 mbps'});
    // // group around 2
    // for (var i = 100; i <= 104; i++) {
    //     var value = 1;
    //     var width = WIDTH_SCALE * 2;
    //     var color = GRAY;
    //     var label = null;
    //     if (i === 103) {
    //         value = 5;
    //         width = 3;
    //     }
    //     if (i === 102) {
    //         color = RED;
    //         label = 'error';
    //     }
    //     nodes.push({id: i, label: '192.168.0.' + i, group: 'cron', value: value});
    //     edges.push({from: 2, to: i, length: LENGTH_SUB, color: color, fontColor: color, width: width, label: label});
    // }
    // nodes.push({id: 201, label: '192.168.0.201', group: 'cron', value: 1});
    // edges.push({from: 2, to: 201, length: LENGTH_SUB, color: GRAY, width: WIDTH_SCALE});
    // group around 3
    // nodes.push({id: 202, label: '192.168.0.202', group: 'cron', value: 4});
    // edges.push({from: 3, to: 202, length: LENGTH_SUB, color: GRAY, width: WIDTH_SCALE * 2});
    // for (var i = 230; i <= 231; i++ ) {
    //     nodes.push({id: i, label: '192.168.0.' + i, group: 'manprocess', value: 2});
    //     edges.push({from: 3, to: i, length: LENGTH_SUB, color: GRAY, fontColor: GRAY, width: WIDTH_SCALE});
    // }
    // group around 1
    // nodes.push({id: 10, label: '192.168.0.10', group: 'microservices', value: 10});
    // edges.push({from: 1, to: 10, length: LENGTH_SERVER, color: GRAY, width: WIDTH_SCALE * 6, label: '0.92 mbps'});
    // nodes.push({id: 11, label: '192.168.0.11', group: 'microservices', value: 7});
    // edges.push({from: 1, to: 11, length: LENGTH_SERVER, color: GRAY, width: WIDTH_SCALE * 3, label: '0.68 mbps'});
    // nodes.push({id: 12, label: '192.168.0.12', group: 'microservices', value: 3});
    // edges.push({from: 1, to: 12, length: LENGTH_SERVER, color: GRAY, width: WIDTH_SCALE, label: '0.3 mbps'});
    // nodes.push({id: 204, label: 'process', group: 'process', value: 10});
    // edges.push({from: 1, to: 204, length: 200, width: WIDTH_SCALE * 3, label: '0.63 mbps'});
    // legend
    var mynetwork = document.getElementById('mynetwork');
    var x = - mynetwork.clientWidth / 2 + 50;
    var y = - mynetwork.clientHeight / 2 + 50;
    var step = 70;

    nodes.push({id: 1000, x: x, y: y, label: 'Process', group: 'process', value: 1, fixed: true, physics:false});
    nodes.push({id: 1001, x: x, y: y + step, label: 'Services', group: 'service', value: 1, fixed: true,  physics:false});
    nodes.push({id: 1002, x: x, y: y + 2 * step, label: 'Cron', group: 'cron', value: 1, fixed: true,  physics:false});
    nodes.push({id: 1003, x: x, y: y + 3 * step, label: 'Manual process', group: 'manprocess', value: 1, fixed: true,  physics:false});
    nodes.push({id: 1004, x: x, y: y + 4 * step, label: '3rd party service', group: 'third_party_service', value: 1, fixed: true, physics:false});
    nodes.push({id: 1005, x: x, y: y + 5 * step, label: 'Database', group: 'database', value: 1, fixed: true, physics:false});

    var options = {
        interaction: {
            hover:true
        },
        nodes: {
            scaling: {
                min: 16,
                max: 32
            }
        },
        edges: {
            color: GRAY,
            smooth: false
        },
        physics:{
            barnesHut:{gravitationalConstant:-30000},
            stabilization: {iterations:2500}
        },
        groups: {
            cron: {
                shape: 'image',
                image:'./images/cron.png'
            },
            manprocess: {
                shape: 'image',
                image:'./images/man_process.png'
            },
            service: {
                shape: 'image',
                image:'./images/service.png'
            },
            process: {
                shape: 'image',
                image:'./images/process.png'
            },
            third_party_service:{
                shape: 'image',
                image:'./images/third_party_service.png'
            },
            database:{
                shape:'image',
                image:'./images/database.png'
            }
        }
    };
    network = new vis.Network(document.getElementById('mynetwork'), {
        nodes: nodes,
        edges: edges
    }, options);

    network.on("hoverNode", function (params) {
        var x = params.pointer.DOM.x;
        var y = params.pointer.DOM.y;

        var tooltip = `<div  id="tooltip" style="position: absolute; left: ${x}px; top: ${y}px" class="col-md-2">
        <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0">agoalofalife@gmail.com</h6>
                    <small class="text-muted">Owner</small>
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0"><a href="https://yandex.ru">Wiki</a></h6>
                    <small class="text-muted">Documentation</small>
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0"><a href="https://yandex.ru">Github</a></h6>
                    <small class="text-muted">Git</small>
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                    <h6 class="my-0">PHP Framework Laravel</h6>
                    <small>Technology</small>
                </div>
            </li>
            <!--<li class="list-group-item d-flex justify-content-between">-->
                <!--<span>Total (USD)</span>-->
            <!--</li>-->
        </ul>
    </div>`;
        elemTooltip = $('body').append(tooltip);
    });

    network.on('blurNode', function (params) {
        $('#tooltip').remove();
    })
}

document.addEventListener('DOMContentLoaded', function () {
    getData('manifest_client.json', draw);
});

function getData(dataUrl, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, false);
    xhr.send();
    if (xhr.status !== 200) {
        alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
        cb.call(this, JSON.parse(xhr.responseText));
    }
}