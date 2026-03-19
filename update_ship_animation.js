const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir);

const newShipCode = `      } else if (step === 6) { // Ship — refined with containers and bridge
        // Hull
        const hullGeo = new THREE.CylinderGeometry(0.45, 0.65, 2.5, 12, 1, false, 0, Math.PI);
        const hullMat = new THREE.MeshPhongMaterial({ color: 0x2244AA, shininess: 80, side: THREE.DoubleSide });
        const hull = new THREE.Mesh(hullGeo, hullMat);
        hull.rotation.z = Math.PI / 2;
        group.add(hull);
        
        // Ship Bridge / Cabin
        const bridgeGeo = new THREE.BoxGeometry(0.4, 0.5, 0.6);
        const bridge = new THREE.Mesh(bridgeGeo, new THREE.MeshPhongMaterial({ color: 0xEEEEEE, shininess: 100 }));
        bridge.position.set(0.85, 0.5, 0);
        group.add(bridge);
        const windows = new THREE.Mesh(new THREE.BoxGeometry(0.41, 0.15, 0.5), new THREE.MeshPhongMaterial({ color: 0x333333 }));
        windows.position.set(0.85, 0.6, 0);
        group.add(windows);

        // More containers in a stacked arrangement
        const colors = [0xFF5733, 0xFFC300, 0x2ECC71, 0x3498DB, 0x9B59B6, 0xE74C3C, 0x1ABC9C, 0xF39C12];
        for (let row = 0; row < 2; row++) {
          for (let i = 0; i < 6; i++) {
            const stackH = (i % 2 === 0) ? 2 : 1;
            for (let h = 0; h < stackH; h++) {
              const cGeo = new THREE.BoxGeometry(0.24, 0.22, 0.28);
              const cMesh = new THREE.Mesh(cGeo, new THREE.MeshPhongMaterial({ 
                color: colors[(i + row + h) % colors.length], 
                shininess: 60 
              }));
              cMesh.position.set(-0.9 + i * 0.26, 0.44 + h * 0.23, -0.15 + row * 0.3);
              group.add(cMesh);
            }
          }
        }

        // Water plane
        const wGeo = new THREE.PlaneGeometry(6, 6, 25, 25);
        const wMat = new THREE.MeshPhongMaterial({ color: 0x1a6699, transparent: true, opacity: 0.7, shininess: 250 });
        const water = new THREE.Mesh(wGeo, wMat);
        water.rotation.x = -Math.PI / 2; water.position.y = -0.52;
        scene.add(water);
        stepScenes[step] = { renderer, scene, camera, group, t: 0, type: 'ship', hull, water };`;

files.forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Target the old ship code block
    // It's roughly from "} else if (step === 6) {" to "stepScenes[step] = { renderer, scene, camera, group, t: 0, type: 'ship', hull, water };"
    
    const startMarker = '} else if (step === 6) { // Ship — simplified with torus hull';
    const endMarker = 'stepScenes[step] = { renderer, scene, camera, group, t: 0, type: \'ship\', hull, water };';
    
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker, startIdx) + endMarker.length;
    
    if (startIdx > -1 && endIdx > -1) {
      const oldBlock = content.substring(startIdx, endIdx);
      content = content.replace(oldBlock, newShipCode);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ship animation in ${file}`);
    } else {
      console.log(`Ship animation block not found in ${file}`);
    }
  }
});
