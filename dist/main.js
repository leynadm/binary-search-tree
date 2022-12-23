/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"randomArray\": () => (/* binding */ randomArray)\n/* harmony export */ });\nfunction randomArray (size){\n    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));\n}\n\n//# sourceURL=webpack://binary-search-tree/./src/functions.js?");

/***/ }),

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Node {\n    constructor(data=null,left=null,right=null){\n        this.data = data\n        this.left = left\n        this.right = right\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Node);\n\n//# sourceURL=webpack://binary-search-tree/./src/node.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree */ \"./src/tree.js\");\n/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ \"./src/functions.js\");\n\n\n\nlet myArray = (0,_functions__WEBPACK_IMPORTED_MODULE_1__.randomArray)(20)\n\nconst myTree = new _tree__WEBPACK_IMPORTED_MODULE_0__.Tree(myArray);\n\nmyTree.buildTree(myArray)\n\nmyTree.prettyPrint(myTree.root)\n\nconsole.log('Is my tree balanced: ' + myTree.isBalanced(myTree.root))\n\nconsole.log(myTree.levelOrder(myTree.root))\nconsole.log(myTree.inorder(myTree.root))\nconsole.log(myTree.preorder(myTree.root))\nconsole.log(myTree.postorder(myTree.root))\n\nmyTree.insert(myTree.root,100)\nmyTree.insert(myTree.root,200)\nmyTree.insert(myTree.root,300)\n\nconsole.log('Is my tree balanced: ' + myTree.isBalanced(myTree.root))\n\nmyTree.prettyPrint(myTree.root)\n\nmyTree.rebalance(myTree.root)\n\nconsole.log('Is my tree balanced: ' + myTree.isBalanced(myTree.root))\n\nconsole.log(myTree.levelOrder(myTree.root))\nconsole.log(myTree.inorder(myTree.root))\nconsole.log(myTree.preorder(myTree.root))\nconsole.log(myTree.postorder(myTree.root))\n\nmyTree.prettyPrint(myTree.root)\n\n\n//# sourceURL=webpack://binary-search-tree/./src/script.js?");

/***/ }),

/***/ "./src/tree.js":
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tree\": () => (/* binding */ Tree)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ \"./src/node.js\");\n\n\nclass Tree {\n    constructor(data){\n        this.data = data\n        this.root;\n    }\n\n\n    buildTree(data){\n\n        let orderedArr = this.sortAndRemoveDuplicates(data)\n        \n        function createTree(arr,indexStart,indexEnd){\n            \n            if(indexStart > indexEnd) return null;\n\n            if(indexStart == undefined){\n                indexStart = 0;\n            }\n            \n            if(indexEnd == undefined){\n\n                indexEnd = arr.length-1;\n            }\n\n            let indexMiddle = Math.floor((indexStart + indexEnd)/2);\n\n            let root = new _node__WEBPACK_IMPORTED_MODULE_0__[\"default\"](orderedArr[indexMiddle])\n            \n            root.left = createTree(arr,indexStart,indexMiddle-1);\n            \n            root.right = createTree(arr,indexMiddle+1,indexEnd);\n            \n            return root;\n\n        } \n\n        this.root = createTree(orderedArr);\n    }\n\n    sortAndRemoveDuplicates(data){\n\n        function mergeSort(arrayParam) {\n        \n            if(arrayParam.length < 2){\n                return arrayParam\n            }\n        \n            const middle = Math.floor(arrayParam.length/2)\n            const arrayLeft = arrayParam.slice(0,middle)\n            const arrayRight = arrayParam.slice(middle)\n        \n            return mergeArrays(mergeSort(arrayLeft), mergeSort(arrayRight))\n        \n        }\n        \n        function mergeArrays(arrayLeft,arrayRight){\n\n            const sortedArr = []\n        \n            while(arrayLeft.length && arrayRight.length){\n                \n                if(arrayLeft[0] < arrayRight[0]) {\n                    sortedArr.push(arrayLeft.shift())\n                } else if (arrayLeft[0] > arrayRight[0]) {\n                    sortedArr.push(arrayRight.shift())\n                } else {\n                    sortedArr.push(arrayLeft.shift())\n                    arrayRight.shift()\n                }\n            } \n            \n            return [...sortedArr,...arrayLeft,...arrayRight]\n        \n        }\n\n        return mergeSort(data)\n    }\n\n    prettyPrint(node = this.root, prefix = '', isLeft = true) {\n        if (node.right !== null) {\n          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);\n        }\n        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);\n        if (node.left !== null) {\n          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);\n        }\n    }\n\n    insert(root,data){\n\n        if(root == null){\n            root = new _node__WEBPACK_IMPORTED_MODULE_0__[\"default\"](data);\n            return root;\n        }\n\n        if(data < root.data){\n            root.left = this.insert(root.left,data);\n        } else if (data > root.data){\n            root.right = this.insert(root.right,data)\n        }\n\n        return root\n    }\n\n\n    delete(root,data){\n\n            \n    /* Base Case: If the tree is empty */\n        if (root == null)\n            return root;\n  \n        /* Otherwise, recur down the tree */\n        if (data < root.data)\n            root.left = this.delete(root.left, data);\n        else if (data > root.data)\n            root.right = this.delete(root.right, data);\n  \n        // if data is same as root's\n        // data, then This is the\n        // node to be deleted\n        else {\n            // node with only one child or no child\n            if (root.left == null)\n                return root.right;\n            else if (root.right == null)\n                return root.left;\n  \n            // node with two children: Get the inorder\n            // successor (smallest in the right subtree)\n            root.data = this.minValue(root.right);\n  \n            // Delete the inorder successor\n            root.right = this.delete(root.right, root.data);\n        }\n  \n        return root;\n    }\n\n    minValue(root){\n        let minv = root.data;\n            while (root.left != null)\n            {\n                minv = root.left.data;\n                root = root.left;\n            }\n            return minv;\n    }\n\n    find(node, data){\n\n        if (node == null) {\n            return null;  // data not found\n        }\n        if (data < node.data) {\n            return this.find(node.left, data);\n        } else if (data > node.data) {\n            return this.find(node.right, data);\n        } else {  // data == node.data\n            return node;  // data found\n        }\n    }\n\n    levelOrder(node){\n\n        /*  Function using iteration\n        let queueArr = []\n        let result = []\n\n        if(node == null) return\n        \n        queueArr.push(node)\n\n        console.log(this.node)\n        while(queueArr.length > 0){\n\n            let current = queueArr.shift(node);\n            result.push(current.data)\n\n            if(current.left != null){\n                queueArr.push(current.left);\n            }\n\n            if(current.right != null){\n                queueArr.push(current.right)\n            }            \n        }\n\n        return result*/\n\n        // Function using recursion\n\n        let result = [];\n        \n        function traverse(node) {\n        \n            if (node == null) return;\n        \n            result.push(node.data);\n        \n            traverse(node.left);\n        \n            traverse(node.right);\n        }\n        \n        traverse(node);\n        \n        return result;\n    }\n\n    height(node) {\n        // If the node is null, return -1 (since the height of a null node is undefined)\n        if (node === null) return -1;\n      \n        // Calculate the height of the left and right children\n        const leftHeight = this.height(node.left);\n        const rightHeight = this.height(node.right);\n      \n        // Return the maximum of the left and right heights, plus 1 for the current node\n        return Math.max(leftHeight, rightHeight) + 1;\n      }\n\n    depth(node, root) {\n        // If the node is null, return -1 (since the depth of a null node is undefined)\n        if (node === null) return -1;\n      \n        // If the node is the root, return 0 (since the depth of the root is 0)\n        if (node === root) return 0;\n      \n        // Calculate the depth of the node by adding 1 to the maximum depth of its children\n        return Math.max(depth(node.left, root), depth(node.right, root)) + 1;\n      }\n\n    preorder(node,callback){\n\n        if(node===null) return []\n        \n        let results = []\n\n        if(callback){\n            callback(node.data)\n        }\n        \n        let leftResults = this.preorder(node.left,callback)\n        let rightResults = this.preorder(node.right,callback)\n        \n        results = results.concat([node.data]).concat(leftResults).concat(rightResults);\n        \n        if(!callback) return results;\n    }\n\n    postorder(node,callback){\n\n        if(node===null) return []\n        \n        let results = []\n\n        let leftResults = this.preorder(node.left,callback)\n        let rightResults = this.preorder(node.right,callback)\n\n        if(callback){\n            callback(node.data)    \n        }    \n\n        results = results.concat(leftResults).concat(rightResults).concat([node.data]);\n        \n        if(!callback) return results;\n\n    }\n\n    inorder(node,callback){\n\n        if (node === null) return [];\n\n        let results = [];\n        \n        let leftResults = this.inorder(node.left,callback);\n        \n        if(callback){\n            callback(node.data)\n        }\n\n        let rightResults = this.inorder(node.right,callback);\n      \n        results = results.concat(leftResults).concat([node.data]).concat(rightResults);\n        \n        if(!callback) return results;\n\n    }\n\n    isBalanced(node){\n\n        if(node===null) return true\n\n        const leftBalanced = this.isBalanced(node.left)\n\n        if(!leftBalanced){\n            return false\n        }\n\n        const rightBalanced = this.isBalanced(node.right)\n\n        if(!rightBalanced){\n            return false\n        }\n\n        const leftHeight = this.height(node.left)\n        const rightHeight = this.height(node.right)\n\n        if(Math.abs(leftHeight-rightHeight)>1){\n            return false\n        }\n\n        return true\n    }\n\n    rebalance(){\n\n        // Create an array to store the nodes in-order traversal\n\n        const inOrderList = this.inorder(this.root)\n\n        this.buildTree(inOrderList)\n        \n    }\n\n    printNode(node){\n        console.log(node)\n    }\n}\n\n\n//# sourceURL=webpack://binary-search-tree/./src/tree.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;