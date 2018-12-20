/**
 * 
 * @authors WangYe wangjacker@163.com
 * @date    2018-12-06 15:00:22
 * @version $Id$
 */

let StopRolling = {};
StopRolling.install = function(Vue) {
    Vue.prototype.overflowScroll = function(el) {
        el.addEventListener('touchstart', function() {
            var top = el.scrollTop,
                totalScroll = el.scrollHeight,
                currentScroll = top + el.offsetHeight;
            if (top === 0) {
                el.scrollTop = 1
            } else if (currentScroll === totalScroll) {
                el.scrollTop = top - 1
            }
        })
        el.addEventListener('touchmove', function(evt) {
            if (el.offsetHeight < el.scrollHeight)
                evt._isScroller = true
        })
    }
}
module.exports = StopRolling;
(function() {
    document.body.addEventListener('touchmove', function(evt) {
        if (!evt._isScroller) {
            evt.preventDefault()
        }
    })
})()
