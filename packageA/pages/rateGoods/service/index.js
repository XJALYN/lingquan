module.exports = {
  // 服务评分
  onServiceRate(e){
   console.log(e)
   let {index,value} = e.detail
   switch(index){
     case 1: this.setData({'service.conformity':value});break;
     case 2: this.setData({'service.attitude':value}); break;
     case 3: this.setData({'service.logistics':value}); break;
     case 4: this.setData({'service.delivery':value}); break;
   }
  }
}