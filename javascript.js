//randomArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
randomArr = [1,2,3]

class Node {
    constructor(data=null,left=null,right=null){
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(data){
        this.data = data
        this.root;
    }


    buildTree(data){

        let orderedArr = this.sortAndRemoveDuplicates(data)
        
        function createTree(arr,indexStart,indexEnd){
            
            if(indexStart > indexEnd) return null;

            if(indexStart == undefined){
                indexStart = 0;
            }
            
            if(indexEnd == undefined){

                indexEnd = arr.length-1;
            }

            let indexMiddle = Math.floor((indexStart + indexEnd)/2);

            let root = new Node(orderedArr[indexMiddle])
            
            root.left = createTree(arr,indexStart,indexMiddle-1);
            
            root.right = createTree(arr,indexMiddle+1,indexEnd);
            
            return root;

        } 

        this.root = createTree(orderedArr);
    }

    sortAndRemoveDuplicates(data){

        function mergeSort(arrayParam) {
        
            if(arrayParam.length < 2){
                return arrayParam
            }
        
            const middle = Math.floor(arrayParam.length/2)
            const arrayLeft = arrayParam.slice(0,middle)
            const arrayRight = arrayParam.slice(middle)
        
            return mergeArrays(mergeSort(arrayLeft), mergeSort(arrayRight))
        
        }
        
        function mergeArrays(arrayLeft,arrayRight){

            const sortedArr = []
        
            while(arrayLeft.length && arrayRight.length){
                
                if(arrayLeft[0] < arrayRight[0]) {
                    sortedArr.push(arrayLeft.shift())
                } else if (arrayLeft[0] > arrayRight[0]) {
                    sortedArr.push(arrayRight.shift())
                } else {
                    sortedArr.push(arrayLeft.shift())
                    arrayRight.shift()
                }
            } 
            
            return [...sortedArr,...arrayLeft,...arrayRight]
        
        }

        return mergeSort(data)
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(root,data){

        if(root == null){
            root = new Node(data);
            return root;
        }

        if(data < root.data){
            root.left = this.insert(root.left,data);
        } else if (data > root.data){
            root.right = this.insert(root.right,data)
        }

        return root
    }


    delete(root,data){

            
    /* Base Case: If the tree is empty */
        if (root == null)
            return root;
  
        /* Otherwise, recur down the tree */
        if (data < root.data)
            root.left = this.delete(root.left, data);
        else if (data > root.data)
            root.right = this.delete(root.right, data);
  
        // if data is same as root's
        // data, then This is the
        // node to be deleted
        else {
            // node with only one child or no child
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;
  
            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            root.data = this.minValue(root.right);
  
            // Delete the inorder successor
            root.right = this.delete(root.right, root.data);
        }
  
        return root;
    }

    minValue(root){
        let minv = root.data;
            while (root.left != null)
            {
                minv = root.left.data;
                root = root.left;
            }
            return minv;
    }

    find(node, data){

        if (node == null) {
            return null;  // data not found
        }
        if (data < node.data) {
            return this.find(node.left, data);
        } else if (data > node.data) {
            return this.find(node.right, data);
        } else {  // data == node.data
            return node;  // data found
        }
    }
}

let myTree = new Tree(randomArr);
myTree.buildTree(randomArr)
//myTree.insert(myTree.root,6);
//myTree.prettyPrint(myTree.root);
//myTree.insert(myTree.root,2);
//myTree.prettyPrint(myTree.root);
//myTree.delete(myTree.root,2);
myTree.insert(myTree.root,5000);
myTree.prettyPrint(myTree.root);
myTree.delete(myTree.root,8);
myTree.prettyPrint(myTree.root);
let findNumber = myTree.find(myTree.root,4);
console.log(findNumber)