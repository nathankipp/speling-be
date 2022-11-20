const WORDS = `
all,am,and,are,at,
back,because,been,before,big,boy,brother,but,
came,can,can’t,car,children,come,could,
did,do,does,don't,down,
eat,fast,father,food,for,friend,from,fun,
gave,get,girl,give,go,going,good,got,
had,has,have,he,her,here,him,house,how,
I'm,if,in,into,is,it,jump,just,like,little,look,
make,mother,my,new,night,not,now,
of,off,old,on,one,or,our,out,over,
pick,play,put,rain,road,run,
said,saw,says,school,see,sister,something,stop,
teach,tell,that,the,them,then,
there,they,this,time,to,too,two,
up,us,very,
walk,want,was,went,were,what,when,
where,who,why,will,with,
you`;

const words = WORDS.split(',').map(word => word.trim());
export default words;
