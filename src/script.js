import { Tree } from "./tree";
import { randomArray } from "./functions";

let myArray = randomArray(20)

const myTree = new Tree(myArray);

myTree.buildTree(myArray)

myTree.prettyPrint(myTree.root)

console.log('Is my tree balanced: ' + myTree.isBalanced(myTree.root))

console.log(myTree.levelOrder(myTree.root))
console.log(myTree.inorder(myTree.root))
console.log(myTree.preorder(myTree.root))
console.log(myTree.postorder(myTree.root))

myTree.insert(myTree.root,100)
myTree.insert(myTree.root,200)
myTree.insert(myTree.root,300)

console.log('Is my tree balanced: ' + myTree.isBalanced(myTree.root))

myTree.prettyPrint(myTree.root)

myTree.rebalance(myTree.root)

console.log('Is my tree balanced: ' + myTree.isBalanced(myTree.root))

console.log(myTree.levelOrder(myTree.root))
console.log(myTree.inorder(myTree.root))
console.log(myTree.preorder(myTree.root))
console.log(myTree.postorder(myTree.root))

myTree.prettyPrint(myTree.root)
