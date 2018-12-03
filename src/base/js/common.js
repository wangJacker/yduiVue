/**
 *
 * @authors WangYe wangjacker@163.com
 * @date    2018-09-20 10:17:48
 * @version $Id$
 */

let Exports = {};
Exports.install = function(Vue) {
    Vue.prototype.overflowScrol = function(el) {
        el.addEventListener('touchstart', function() {
            var top = el.scrollTop,
                totalScroll = el.scrollHeight,
                currentScroll = top + el.offsetHeight
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
module.exports = Exports;
(function() {
    document.body.addEventListener('touchmove', function(evt) {
        if (!evt._isScroller) {
            evt.preventDefault()
        }
    })
})()

