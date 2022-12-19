randomArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

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

            let root = new Tree(orderedArr[indexMiddle])
            
            root.left = createTree(arr,indexStart,indexMiddle-1);
            
            root.right = createTree(arr,indexMiddle+1,indexEnd);
            
            return root;

        }

        const prettyPrint = (node, prefix = '', isLeft = true) => {
            if (node.right !== null) {
              prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            if (node.left !== null) {
              prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
          }

          prettyPrint(createTree(orderedArr))

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
        console.log(mergeSort(data))
        return mergeSort(data)
    }
}

let myTree = new Tree(randomArr);
myTree.buildTree(randomArr)