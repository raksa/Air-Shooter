"use strict";
AirShooter.Game.prototype.bossHitTest = function (boss, bullet) {
    if ((bullet.x > boss.x + boss.width / 5 &&
        bullet.y > boss.y) ||
        (bullet.x < boss.x - boss.width / 5 &&
            bullet.y > boss.y)) {
        return false;
    } else {
        return true;
    }
};