import Node from "./node";

export class Tree {
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

    levelOrder(node){

        /*  Function using iteration
        let queueArr = []
        let result = []

        if(node == null) return
        
        queueArr.push(node)

        console.log(this.node)
        while(queueArr.length > 0){

            let current = queueArr.shift(node);
            result.push(current.data)

            if(current.left != null){
                queueArr.push(current.left);
            }

            if(current.right != null){
                queueArr.push(current.right)
            }            
        }

        return result*/

        // Function using recursion

        let result = [];
        
        function traverse(node) {
        
            if (node == null) return;
        
            result.push(node.data);
        
            traverse(node.left);
        
            traverse(node.right);
        }
        
        traverse(node);
        
        return result;
    }

    height(node) {
        // If the node is null, return -1 (since the height of a null node is undefined)
        if (node === null) return -1;
      
        // Calculate the height of the left and right children
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
      
        // Return the maximum of the left and right heights, plus 1 for the current node
        return Math.max(leftHeight, rightHeight) + 1;
      }

    depth(node, root) {
        // If the node is null, return -1 (since the depth of a null node is undefined)
        if (node === null) return -1;
      
        // If the node is the root, return 0 (since the depth of the root is 0)
        if (node === root) return 0;
      
        // Calculate the depth of the node by adding 1 to the maximum depth of its children
        return Math.max(depth(node.left, root), depth(node.right, root)) + 1;
      }

    preorder(node,callback){

        if(node===null) return []
        
        let results = []

        if(callback){
            callback(node.data)
        }
        
        let leftResults = this.preorder(node.left,callback)
        let rightResults = this.preorder(node.right,callback)
        
        results = results.concat([node.data]).concat(leftResults).concat(rightResults);
        
        if(!callback) return results;
    }

    postorder(node,callback){

        if(node===null) return []
        
        let results = []

        let leftResults = this.preorder(node.left,callback)
        let rightResults = this.preorder(node.right,callback)

        if(callback){
            callback(node.data)    
        }    

        results = results.concat(leftResults).concat(rightResults).concat([node.data]);
        
        if(!callback) return results;

    }

    inorder(node,callback){

        if (node === null) return [];

        let results = [];
        
        let leftResults = this.inorder(node.left,callback);
        
        if(callback){
            callback(node.data)
        }

        let rightResults = this.inorder(node.right,callback);
      
        results = results.concat(leftResults).concat([node.data]).concat(rightResults);
        
        if(!callback) return results;

    }

    isBalanced(node){

        if(node===null) return true

        const leftBalanced = this.isBalanced(node.left)

        if(!leftBalanced){
            return false
        }

        const rightBalanced = this.isBalanced(node.right)

        if(!rightBalanced){
            return false
        }

        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)

        if(Math.abs(leftHeight-rightHeight)>1){
            return false
        }

        return true
    }

    rebalance(){

        // Create an array to store the nodes in-order traversal

        const inOrderList = this.inorder(this.root)

        this.buildTree(inOrderList)
        
    }

    printNode(node){
        console.log(node)
    }
}
