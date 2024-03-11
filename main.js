/**
 * 前言:当我们正准备好了threejs基础环境之后
 * 1. 创建立方缓冲几何体，并且调用创建立方缓冲几何体方法
 * 2. 准备第一个场景数锯(纹理加载器的公共资源路径,以及需要加载图片数据，以及标记点数据)
 * 3. 创建一个贴图方法，对立方缓冲几何体进行贴图
 * 4. 如果场景存在标记点数据，那么对立方缓冲几何体贴完图之后,创建标记点贴图方法，并进行调用创建分组，将立方缓存几何体添加到分组，以及标记点添加到分组，将分组添加到场景
 * 5 .创建分组，将立方缓存几何体添加到分组，以及标记点添加到分组，将分组添加到场景
 */
import './style.css'
// 引入初始化场景
import { scene,camera } from './utils/init.js'
// 引入2d转3d方法
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
// 引入gui工具
import  guiMove  from './utils/gui.js'
// 引入three.js
import * as THREE from 'three'
let video
let videoStatus
// 创建分组
let group=new THREE.Group()

// 准备纹理贴图所需要的数据
const sceneInfoObj = {
  // 第一个场景的数据
  one: {
    // 纹理加载的公共资源路径
    publicPath: "technology/1/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: 'landMark',
        // 标记点图片的路径
        imgUrl: 'other/landmark.png',
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.46, -0.11, -0.11],
        // 物体的旋转角度
        rotation: [1.42, 0.68, 1.63],
        // 切换的下一个场景
        targetAttr: "two"
      }
    ]
  },
  // 第二个场景的数据
  two: {
    // 纹理加载的公共资源路径
    publicPath: "technology/2/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: 'landMark',
        // 标记点图片的路径
        imgUrl: 'other/landmark.png',
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.35, -0.09, 0.03],
        // 物体的旋转角度
        rotation: [4.72, 0.89, 2.36],
        // 切换的下一个场景
        targetAttr: "one"
      },
      {
        // 标记点名称
        name: 'landMark',
        // 标记点图片的路径
        imgUrl: 'other/landmark.png',
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.46, -0.11, -0.11],
        // 物体的旋转角度
        rotation: [1.42, 0.68, 1.63],
        // 切换的下一个场景
        targetAttr: "three"
      }
    ]
  },
  // 第三个场景的数据
  three: {
    // 纹理加载的公共资源路径
    publicPath: "technology/3/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: 'landMark',
        // 标记点图片的路径
        imgUrl: 'other/landmark.png',
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.4, -0.18, 0.32],
        // 物体的旋转角度
        rotation: [-1.53, -0.04, -1.26],
        // 切换的下一个场景
        targetAttr: "two"
      },
      {
        // 标记点名称
        name: 'landMark',
        // 标记点图片的路径
        imgUrl: 'other/landmark.png',
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.32, -0.16, -0.33],
        // 物体的旋转角度
        rotation: [1.46, 0.1, -0.17],
        // 切换的下一个场景
        targetAttr: "four"
      }
    ]
  },
  // 第四个场景的数据
  four: {
    // 纹理加载的公共资源路径
    publicPath: "technology/4/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        // 标记点名称
        name: 'landMark',
        // 标记点图片的路径
        imgUrl: 'other/landmark.png',
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.35, -0.22, 0.4],
        // 物体的旋转角度
        rotation: [-0.85, -0.45, -1.8],
        // 切换的下一个场景
        targetAttr: "three"
      },
      {
        // 标记点名称
        name: 'dom',
        // 物体的位置坐标
        position: [0.49, 0, 0],
        // 物体的旋转角度
        rotation: [0, -0.5 * Math.PI, 0],
        // 切换的下一个场景
        targetAttr: "five",
        // 回调函数
        active() {
          setMaterialCube(sceneInfoObj.five)
        },
      }
    ]
  },
  // 第二个场景的数据
  five: {
    // 纹理加载的公共资源路径
    publicPath: "technology/5/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        // 标记点名称
        name: 'landMark',
        // 标记点图片的路径
        imgUrl: 'other/landmark.png',
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.05, -0.08, 0.46],
        // 物体的旋转角度
        rotation: [5.41, 2.91, 4.79],
        // 切换的下一个场景
        targetAttr: "four"
      },
      {
        // 标记点名称
        name: 'landMark',
        // 标记点图片的路径
        imgUrl: 'other/landmark.png',
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.05, 0.08, 0.46],
        // 物体的旋转角度
        rotation: [5.41, 2.91, 4.79],
        // 切换的下一个场景
        targetAttr: "six"
      },
      {
        // 标记点名称
        name: 'video',
        // 视频路径
        imgUrl: 'video/movie.mp4',
        // 物体的宽高
        wh: [0.2, 0.1],
        // 物体的位置坐标
        position: [0.49, 0.04, 0.045],
        // 物体的旋转角度
        rotation: [0, -0.5 * Math.PI, 0],
      }
    ]
  },
  six: {
    // 纹理加载的公共资源路径
    publicPath: "technology/6/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
  }
}
// 创建立方缓冲几何体
function createCube() {

  const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00,side: THREE.DoubleSide} ); 
const cube = new THREE.Mesh( geometry, material ); 


cube.scale.set(1,1,-1)
// 将分组添加到场景
scene.add( cube );
return cube;
}
// 创建纹理加载器，并对立方缓冲几何体进行贴图
function setMaterialCube(infObj){
clear()
  const {publicPath,imgUrlArr,markList}=infObj;
console.log(imgUrlArr);
const texturlLoader=new THREE.TextureLoader();
texturlLoader.setPath(publicPath)
// 通过纹理加载器加载图片资源，并创建相应材质
const materialArr=imgUrlArr.map(item=>{
const textUrl=texturlLoader.load(item)
// 设置图片的颜色通道为rgb
textUrl.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshBasicMaterial({
    map:textUrl,
    side: THREE.DoubleSide
  })
})
cubeObj.material=materialArr
markList.forEach((markObj) => {
  // 如果常经理存在标记点，则调用个创建标记点的方法 
  if(markObj.name==="landMark") createLandMark(markObj)
  else if(markObj.name==="dom")createDomMark(markObj)
else if(markObj.name==="video")createVideoMark(markObj)

})
}


// 创建标记点贴图
function  createLandMark(infObj){
  const {name,imgUrl,wh,position,rotation,targetAttr}=infObj
  // 创建纹理加载器
  const textureLoader = new THREE.TextureLoader();
  // 创建图形
  const geometry = new THREE.PlaneGeometry( ...wh );
  // 创建材质
  const material = new THREE.MeshBasicMaterial( {
    map:textureLoader.load(imgUrl),
    side: THREE.DoubleSide,
    // 设置背景透明
    transparent: true,
  } );
  // 创建物体对象，并且将图形与材质渲染到对象
  const plane = new THREE.Mesh( geometry, material );
  // // 设置物体的坐标
  plane.position.set( ...position );
  // 设置物体的旋转角度
  plane.rotation.set( ...rotation );
  // 设置标记点名称
  plane.name=name
  // 讲标记点的数据添加到物体上
  plane.userData.targetAttr=targetAttr
  guiMove(plane)
  group.add(plane)
  scene.add( group );
}
// 创建文本标记点
function createDomMark(infObj){
  let { position, rotation, active } = infObj
  const tag = document.createElement('span')
  tag.className = "mark-style"
  tag.innerHTML = "前进"
  tag.style.color = "#fff"
  tag.style.pointerEvents = "all"
  tag.addEventListener("click", (e) => {
    active(e)
  })


  const tag3d = new CSS3DObject(tag)
  tag3d.scale.set(1 / 800, 1 / 800, 1 / 800)
  tag3d.position.set(...position)
  tag3d.rotation.set(...rotation)
  group.add(tag3d)
}
// 创建视频纹理
function createVideoMark(infObj){
const {name,imgUrl,wh,position,rotation,targetAttr}=infObj
// 创建视频
video = document.createElement('video')
video.src = imgUrl
video.muted = true
video.addEventListener("loadedmetadata",()=>{
  video.play()
  videoStatus=true
  video.muted=false
})

// 创建纹理加载器
const textureLoader = new THREE.VideoTexture(video);
// 创建图形
const geometry = new THREE.PlaneGeometry( ...wh );
// 创建材质
const material = new THREE.MeshBasicMaterial( {
  map:textureLoader,
})
// 创建物体
const plane = new THREE.Mesh( geometry, material );
plane.position.set( ...position );
plane.rotation.set( ...rotation );
plane.name=name
// 添加到场景
group.add(plane);
}


// 清除上一个场景的标记点
function clear(){
  console.log("group",group);
  const list=[...group.children]
  list.forEach((obj)=>{
    if(!obj.isObject3D){
      obj.geometry.dispose()
      obj.material.dispose()
    }
    group.remove(obj)
  })
}
// 给3D场景添加点击事件
function bindClick(){
  const raycaster = new THREE.Raycaster();
  const pointer=new THREE.Vector2()
  window.addEventListener('click',(e)=>{
    // 将鼠标位置归一为设备坐标。x和y方向的取值范围是（-1 to +1)
    pointer.x=(e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer,camera);
    // 计算物体和射线的焦点
    const intersects=raycaster.intersectObjects(scene.children)
    console.log("intersects",intersects);
  const obj=  intersects.find(item=>item.object.name=="landMark")
  const videoObj=  intersects.find(item=>item.object.name=="video")
  if(obj){
    // 当点击了标记点，切换场景的数据
    const infoObj=sceneInfoObj[obj.object.userData.targetAttr]
    console.log("infoObj",infoObj);
    if(infoObj) setMaterialCube(infoObj)
  }

if(videoObj){
if(videoStatus){
  video.pause()
  videoStatus=false
}else {
  video.play()
  videoStatus=true
}
}
  })

}

const cubeObj = createCube()
bindClick()
setMaterialCube(sceneInfoObj.one)