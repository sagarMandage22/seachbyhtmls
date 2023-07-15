import { LightningElement,wire} from 'lwc';
import getContactList from '@salesforce/apex/searchBoxController.getContactList'
export default class SearchBox extends LightningElement {
    headings=["Id","Name","SALE DATE","TYRE BRAND","TYRE SIZE","SALE QUANTITY","SALE PRICE"] /**heading and filter data use to create tabel */
    fullTableData = []  /**heading and filter data use to create tabel */
    filteredData = []
    timer
    filterBy= "Name"
    sortedBy= "Name"
sortDirection= "asc"


@wire(getContactList)
contactHandler({data,error}){
    if(data){
        console.log(data)
        this.fullTableData = data
        this.filteredData= [...this.sortBy(data)]
    }
    if(error){
        console.log(error)
    }

}

get filterByHandler(){ /**filterbyhandler created for options in combo-box */
    return [
        {label:'All', value:'All'},
        {label:'Id', value:'Id'},
        {label:'Name', value:'Name'},
        {label:'SALE DATE', value:'SALE_DATE__c'},
        {label:'TYRE BRAND', value:'TYRE_BRAND__c'},
        {label:' TYRE SIZE', value:'TYRE_SIZE__c'},
        {label:'SALE QUANTITY', value:'SALE_QUANTITY__c'},
        {label:'SALE PRICE', value:'SALE_PRICE__c'},
    
        ]
}
get sortByOptions(){
     return [
        
        {label:'Id', value:'Id'},
        {label:'Name', value:'Name'},
        {label:'SALE DATE', value:'SALE_DATE__c'},
        {label:'TYRE BRAND', value:'TYRE_BRAND__c'},
        {label:' TYRE SIZE', value:'TYRE_SIZE__c'},
        {label:'SALE QUANTITY', value:'SALE_QUANTITY__c'},
        {label:'SALE PRICE', value:'SALE_PRICE__c'},
    
         ]
}
filterByyHandler(event){
    this.filterBy= event.target.value
}

filterHandler(event){      /**use for handling id name title field while searching */
    const {value}=event.target
   
  if(value){
    window.clearTimeout(this.timer)
      this.timer= window.setTimeout(()=>{
            this.filteredData= this.fullTableData.filter(eachobj=>{
                if(this.filterBy === 'All'){
                    return Object.keys(eachobj).some(key=>{   /**here some loop is running on all keys // object.kays is the method that return keys of eachobj */
                    return eachobj[key].toLowerCase().includes(value)
                })

                }
                else{
                    const val = eachobj[this.filterBy] ? eachobj[this.filterBy]:''
                    return val.toLowerCase().includes(value)
                }
               
               
        })
       
        },500)
    }
    else{
        this.filteredData= [...this.fullTableData]}
    }
    sortHandler(event){
        this.sortedBy= event.target.value
        this.filteredData= [...this.sortBy(this.filteredData)]
    }
    sortBy(data){
        const cloneData = [...data]
        cloneData.sort((a,b)=>{
            if(a[this.sortedBy] === b[this.sortedBy]){
                return 0
            }
            return this.sortDirection === 'desc' ? 
            a[this.sortedBy] > b[this.sortedBy] ? -1:1 :
            a[this.sortedBy] < b[this.sortedBy] ? -1:1
        })
        return cloneData
    }
}