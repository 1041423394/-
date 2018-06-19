var fs = require("fs");//文件
var path=process.cwd();//输入的命令
var defaultDir=process.argv[2];//读取哪个文件
var dir = process.argv[3];//创建那个文件夹

fs.readFile(path+'/../../'+defaultDir+'.js', function (err, data) {//读
    if (err) {
        return console.error(err);
    }
    fs.mkdir(dir,function(err){//创建文件夹
        if (err) {
            return console.error(err);
        }
        fs.writeFile(dir+'/'+dir+'.js', data.toString(),  function(err) {//写
            if (err) {
                return console.error(err);
            }
         })
         fs.writeFile(dir+'/'+dir+'.wxml', '',  function(err) {//写
            if (err) {
                return console.error(err);
            }
         })
         fs.writeFile(dir+'/'+dir+'.wxss', '',  function(err) {//写
            if (err) {
                return console.error(err);
            }
         })
         fs.writeFile(dir+'/'+dir+'.json', '{}',  function(err) {//写
            if (err) {
                return console.error(err);
            }
         })
     });
   
 });
