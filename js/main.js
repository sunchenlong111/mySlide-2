let n = 1;
init(n)
setInterval(() => {
  makeLeave(getImage(n))
    .one('transitionend', (e) => {
      makeEnter($(e.currentTarget))
    }) //为什么使用one，one只监听一次，监听完毕后就销毁，不然的话只要一运动结束，就会加一个enter状态
  makeCurrent(getImage(n + 1))
  n = n + 1
}, 3000);



////////////////////////////////////////////

function getImage(n) {
  return $(`.images>img:nth-child(${judgeN(n)})`)
}

function makeCurrent($node) {
  return $node.removeClass('leave enter').addClass('current')
}

function makeLeave($node) {
  return $node.removeClass('current enter').addClass('leave')
}

function makeEnter($node) {
  return $node.removeClass('current leave').addClass('enter')
}

function init(n) {
  $(`.images>img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}

function judgeN(n) {
  if (n > 4) {
    n = n % 4
    if (n === 0) {
      n = 4
    }
  }
  return n
} 