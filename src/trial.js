/* eslint-disable no-console */
var products = [
  { name: "orange", type: "fruit", quantity: 10, price: 14 },
  { name: "banana", type: "vegetable", quantity: 0, price: 1 },
  { name: "cucumber", type: "vegetable", quantity: 40, price: 8 },
  { name: "mango", type: "fruit", quantity: 3, price: 5 },
];

let posts = [
  { id: 1, title: "New Post" },
  { id: 2, title: "Old Post" },
  { id: 4, title: " Next Post" }
];
let comments = [
  { postId: 4, content: "awesome post" },
  { postId: 3, content: "it was ok" },
  { postId: 4, content: "neat" }
];

let a = [1, 2, [3]];
let b = [1, 2, [4]];

let paints = [ { color: "red" }, { color: "blue" }, { color: "yellow" }];

let list = products.map(function(product){
  return product.price *2;
});

Array.prototype.equals = function (array) {
  let that = this;
  if (!array) return false;
  if (that.length !== array.length) return false;
  for (var i = 0; i < that.length; i++) {
    if (that[i] instanceof Array && array[i] instanceof Array) {
      if (!that[i].equals(array[i]))
        return false;
    }
    else if (that[i] != array[i]) {
      return false;
    }
  }
  return true;
};


// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function pluck(array, property){
  return array.map(function(r){
    return r[property];
  });
}


function groupBy(array, callback ) {
  var groups = {};
  array.forEach( function(arr) {
    var group = JSON.stringify( callback(arr) );
    groups[group] = groups[group] || [];
    groups[group].push(arr);
  });

  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}

function commentsForPost(posts, comments) {
  return comments.filter(function (comment) {
    return comment.postId === posts.id;
  });
}


function postForComment(posts, comments) {
  return posts.find(function (post) {
    return post.id === comments.postId;
  });
}

commentsForPost(posts, comments);
postForComment(posts, comments);

var result = groupBy(products, function(item) {
  return item.type;
});

console.log(result);



pluck(products, "name");


let stack = function () {
  this.storage = "";
};

stack.prototype.push = function (val) {
  this.storage = this.storage.concat("***", val);
};

stack.prototype.pop = function () {
  // slice off the last characters up until ***
  let str = this.storage.slice(this.storage.lastIndexOf("***") + 3);

  // updating the new stack without the last item
  this.storage = this.storage.substr(0, this.storage.lastIndexOf("***"));

  // return the last item
  return str;
};

function foosy() {
  var args = [].slice.call(arguments);
  args.unshift(42);
  console.log(args);
}

foosy();

function foo(x,y,z, ...rest) {
  return [x, ...rest];
}

function bar() {
  var a1 = [2, 4];
  var b1 = [6, 8, 10, 12];

  return foo(...a1, ...b1);
}

function fooArr() {
  return [1, 2, 3];
}

var a, b, c, args;

[
  a,
  b = 42,
  c,
  ...args
] = fooArr() || [];

console.log(args);

console.log(
  bar().join("") === "281012"
);

