/* GET users listing. */
exports.list = function(req, res){
  res.send('respond with a resource');
};


// Teachers
exports.teachers = function(req, res){
  res.render('teaches', {
    title: 'Teachers',
    teaches: [{name:'A', sex: '男'}, {name:'B', sex: '女'}]
  });
};
