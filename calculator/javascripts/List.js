    var Node = function(newData){  
        this.next = null;  
        this.data = null;  
        this.Init = function(){  
            this.data = newData;  
        };  
        this.Init();  
    };    
    var List = function(){  
        this.head = null;  
        this.size = 0;  
        this.Init = function(){  
            this.head = null;  
            this.size = 0;  
        }  
        this.Init();  
          
        this.insert = function(newData){  
            this.size += 1;  
            var newNode = new Node(newData);  
            if(this.head == null){  
                this.head = newNode;  
                return;  
            }  
            var tempNode = this.head;  
            while(tempNode.next != null)  
                tempNode = tempNode.next;  
            tempNode.next = newNode;  
        };  
          
        this.getData = function(pos){  
            if(pos >= this.size || pos < 0)  
                return null;    
            else{  
                tempNode = this.head;  
                for(i = 0;i < pos;i++)    
                    tempNode = tempNode.next;    
                return tempNode.data;    
             }  
        };
        this.setData = function(pos,num){  
            if(pos >= this.size || pos < 0)  
                return null;    
            else{  
                tempNode = this.head;  
                for(i = 0;i < pos;i++)    
                    tempNode = tempNode.next;    
                tempNode.data = num;    
             }  
        };  
          

        this.remove = function(pos){  
            if(pos >= this.size || pos < 0)  
                return null;      
            this.size -= 1;  
            tempNode = this.head;  
            if(pos == 0){  
                this.head = this.head.next;  
                return this.head;  
            }  
            for(i = 0;i < pos - 1;i++){  
                tempNode = tempNode.next;  
            }  
            tempNode.next = tempNode.next.next; 
            return tempNode.next;  
                  
        };
          
        this.print = function(){   
            tempNode = this.head;  
            while(tempNode != null){
                tempNode = tempNode.next;  
            }  
        };  
    }
      
