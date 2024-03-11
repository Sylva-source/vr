// 这个文件的作用主要就是初始化ThreeJs基础环境
// 初始化场景，摄像机，渲染器。轨道控制器，坐标轴，场景适配，渲染循环

// 引入ThreeJS
import * as THREE from 'three';
// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入将原生dom转化为3D渲染到3D场景中的方法
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'
// 初始化场景
export let scene,camera,renderer,controls,css3DRenderer
(function init(){
    // 创建场景
  scene = new THREE.Scene();
    // 创建摄像机
  camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.z=0.1;
    // 创建渲染器
  renderer=new THREE.WebGLRenderer({antialias:true});
   // 设置画布大小
  renderer.setSize(window.innerWidth,window.innerHeight);
   //将渲染器添加到dom
   document.body.appendChild(renderer.domElement)
})();
// 轨道控制器
(function createControls(){
  controls=new OrbitControls(camera,renderer.domElement)
  // 设置轨道控制器垂直方向旋转的角度
  controls.minPolarAngle=0.25 * Math.PI;
  // 开启阻尼效果
  controls.enableDamping=true;
  // 禁止滚动缩放
  controls.enableZoom=false
})();
// 将原生dom3d渲染到3d场景中
(function createCSS3DRedderer(){
    // 创建文本3d渲染器
    css3DRenderer = new CSS3DRenderer()
    // 设置文本渲染器大小
    css3DRenderer.setSize(window.innerWidth, window.innerHeight)
    // 默认去除dom事件
    css3DRenderer.domElement.style.pointerEvents = "none"
    css3DRenderer.domElement.style.position = "fixed"
    css3DRenderer.domElement.style.top="0"
    css3DRenderer.domElement.style.left="0"
    // 添加到body中
    document.body.appendChild(css3DRenderer.domElement)
})();
// 坐标轴
(function createHelper(){
//     // 创建坐标轴
// const axexHelper = new THREE.AxesHelper(5);
// scene.add(axexHelper);
})();
// 场景适配
(function resizeRender(){
    // 监听浏览器窗口的变化
window .addEventListener('resize',function(){
    // 自适应摄像机的宽高比
    camera.aspext=window.innerWidth / window.innerHeight
    // 自适应画布的宽高比
    renderer.setSize(window.innerWidth,window.innerHeight)
    // 重新更新锥体空间
    camera.updateProjectionMatrix()
})
})();
// 循环渲染
(function renderLoop(){
// 通过轨道控制器实例方法调用update实现场景更新
controls.update()
// 将场景和摄像机渲染到画布上
renderer.render(scene,camera)
css3DRenderer.render(scene,camera)
    // 渲染更新渲染
requestAnimationFrame(renderLoop)
})()