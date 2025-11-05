namespace SpriteKind {
    export const Bee = SpriteKind.create()
    export const Screen = SpriteKind.create()
    export const Token = SpriteKind.create()
    export const PlayerTwo = SpriteKind.create()
    export const Tree = SpriteKind.create()
    export const Zone = SpriteKind.create()
    export const Honey = SpriteKind.create()
    export const Wave = SpriteKind.create()
    export const MorphFruit = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Spider = SpriteKind.create()
    export const Web = SpriteKind.create()
}
namespace StatusBarKind {
    export const Pollen = StatusBarKind.create()
    export const BossHealth = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (spriteutils.distanceBetween(sprite, otherSprite) <= 3 && spriteutils.distanceBetween(sprite, otherSprite) >= -3) {
        statusbar3.value += -3
    }
})
scene.onOverlapTile(SpriteKind.Boss, assets.tile`myTile50`, function (sprite, location) {
tiles.setTileAt(location, img`
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c c c c c c
`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile70`, function (sprite, location) {
    sprite.sayText(storage.ifThenElse(instantPollenConversion, "Convert Pollen - " + playerOneBees.length * 1000 + " Honey", "You can only use this once per minute."), 100, false)
    if (controller.A.isPressed()) {
        if (instantPollenConversion) {
            if (statusbar.value >= 1) {
                if (blockSettings.readNumber("Honey") >= playerOneBees.length * 1000) {
                    instantPollenConversion = false
                    blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - playerOneBees.length * 1000)
                    blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") + statusbar.value * blockSettings.readNumber("Multiplier"))
                    statusbar.value = 0
                    timer.after(60000, function() {
                        instantPollenConversion = true
                    })
                }
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile43`, function (sprite, location) {
    sprite.sayText(playerOneUpgrades[4], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneUpgrades[4] == "Decuple Storage - 120000 Honey") {
            if (blockSettings.readNumber("Honey") >= 120000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 120000)
                blockSettings.writeNumber("Max Storage", blockSettings.readNumber("Max Storage") * 10)
                statusbar.max = blockSettings.readNumber("Max Storage")
                statusbar.max += playerOneBees.length * 10 * number_of_bees(playerOneBees, "Robot Bee")
                playerOneUpgrades[4] = "Owned"
                blockSettings.writeStringArray("Storage Upgrades", playerOneUpgrades)
                console.log("storage upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile49`, function (sprite, location) {
    if (blockSettings.readImage("Skin").equals(img`
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        `)) {
        sprite.sayText("x2 Honey - 2500000 Honey", 100, false)
        if (controller.A.isPressed()) {
            if (blockSettings.readNumber("Honey") >= 2500000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 2500000)
                blockSettings.writeNumber("Multiplier", 2)
                blockSettings.writeImage("Skin", img`
                    . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
                    4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 5 4 4 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 4 5 5 4 5 5 4 
                    4 5 4 5 5 5 5 4 5 5 5 5 5 4 5 4 
                    4 5 5 4 5 5 4 5 5 5 5 5 5 4 5 4 
                    4 5 5 5 4 4 5 5 5 5 5 5 4 5 5 4 
                    4 5 5 5 4 4 5 5 5 5 5 4 5 5 5 4 
                    4 5 5 4 5 5 4 5 5 5 4 5 5 5 5 4 
                    4 5 4 5 5 5 5 4 5 4 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 4 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 4 4 4 4 4 5 4 
                    4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
                    . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
                    `)
                mySprite.setImage(blockSettings.readImage("Skin"))
            }
        }
    } else {
        sprite.sayText("Owned", 100, false)
    }
})
scene.onOverlapTile(SpriteKind.Wave, assets.tile`myTile24`, function (sprite, location) {
    statusbar.value += 4
    tiles.setTileAt(location, assets.tile`myTile30`)
    timer.after(cooldown + 0, function () {
        tiles.setTileAt(location, assets.tile`myTile24`)
    })
})
sprites.onOverlap(SpriteKind.Token, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataString(sprite, "Effect") == "Explosion" && sprites.readDataString(sprite, "Status") == "Active") {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -1
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value == 0) {
            if (Math.percentChance(sprites.readDataNumber(otherSprite, "Chance"))) {
                morphFruitToken = sprites.create(img`
                    . . e e e e e e . . 
                    . e e e 7 e e e e . 
                    e e e e e 7 e e e e 
                    e e e 5 5 5 5 e e e 
                    e e 5 5 f 5 f 5 e e 
                    e e 5 f 5 f 5 f e e 
                    e e 5 f 5 5 5 f e e 
                    e e 5 5 5 5 5 5 e e 
                    . e e 5 5 5 5 e e . 
                    . . e e e e e e . . 
                    `, SpriteKind.MorphFruit)
                morphFruitToken.setPosition(sprite.x, sprite.y)
            } else {
                honeyToken = sprites.create(img`
                    . . 5 5 5 5 5 5 . . 
                    . 5 5 5 4 5 5 5 5 . 
                    5 5 5 4 4 5 5 5 5 5 
                    5 5 4 4 4 4 5 5 5 5 
                    5 5 4 4 4 4 5 5 5 5 
                    5 5 4 4 4 4 4 5 5 5 
                    5 5 4 4 4 4 4 5 5 5 
                    5 5 5 4 4 4 5 5 5 5 
                    . 5 5 5 5 5 5 5 5 . 
                    . . 5 5 5 5 5 5 . . 
                    `, SpriteKind.Honey)
                honeyToken.setPosition(sprite.x, sprite.y)
            }
            console.log("" + sprites.readDataString(otherSprite, "Enemy") + " defeated")
            sprites.destroy(statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite))
            sprites.destroy(otherSprite)
        }
    } else if (sprites.readDataString(sprite, "Effect") == "Nuke" && sprites.readDataString(sprite, "Status") == "Active") {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -2
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value == 0) {
            if (Math.percentChance(sprites.readDataNumber(otherSprite, "Chance"))) {
                morphFruitToken = sprites.create(img`
                    . . e e e e e e . . 
                    . e e e 7 e e e e . 
                    e e e e e 7 e e e e 
                    e e e 5 5 5 5 e e e 
                    e e 5 5 f 5 f 5 e e 
                    e e 5 f 5 f 5 f e e 
                    e e 5 f 5 5 5 f e e 
                    e e 5 5 5 5 5 5 e e 
                    . e e 5 5 5 5 e e . 
                    . . e e e e e e . . 
                    `, SpriteKind.MorphFruit)
                morphFruitToken.setPosition(sprite.x, sprite.y)
            } else {
                honeyToken = sprites.create(img`
                    . . 5 5 5 5 5 5 . . 
                    . 5 5 5 4 5 5 5 5 . 
                    5 5 5 4 4 5 5 5 5 5 
                    5 5 4 4 4 4 5 5 5 5 
                    5 5 4 4 4 4 5 5 5 5 
                    5 5 4 4 4 4 4 5 5 5 
                    5 5 4 4 4 4 4 5 5 5 
                    5 5 5 4 4 4 5 5 5 5 
                    . 5 5 5 5 5 5 5 5 . 
                    . . 5 5 5 5 5 5 . . 
                    `, SpriteKind.Honey)
                honeyToken.setPosition(sprite.x, sprite.y)
            }
            console.log("" + sprites.readDataString(otherSprite, "Enemy") + " defeated")
            sprites.destroy(statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite))
            sprites.destroy(otherSprite)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile20`, function (sprite, location) {
    sprite.sayText(playerOneUpgrades[1], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneUpgrades[1] == "Quadruple Storage - 6000 Honey") {
            if (blockSettings.readNumber("Honey") >= 6000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 6000)
                blockSettings.writeNumber("Max Storage", blockSettings.readNumber("Max Storage") * 4)
                statusbar.max = blockSettings.readNumber("Max Storage")
                statusbar.max += playerOneBees.length * 10 * number_of_bees(playerOneBees, "Robot Bee")
                playerOneUpgrades[1] = "Owned"
                blockSettings.writeStringArray("Storage Upgrades", playerOneUpgrades)
                console.log("storage upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Wave, assets.tile`myTile59`, function (sprite, location) {
    statusbar.value += 20
    tiles.setTileAt(location, assets.tile`myTile61`)
    timer.after(cooldown + 0, function () {
        tiles.setTileAt(location, assets.tile`myTile59`)
    })
})
function honey_glob (col: number, row: number) {
    if (mySprite.image.equals(img`
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
        4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
        4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
        4 5 5 5 5 5 5 5 5 5 4 4 5 5 5 4 
        4 5 5 5 5 5 5 5 5 4 5 5 4 5 5 4 
        4 5 4 5 5 5 5 4 5 5 5 5 5 4 5 4 
        4 5 5 4 5 5 4 5 5 5 5 5 5 4 5 4 
        4 5 5 5 4 4 5 5 5 5 5 5 4 5 5 4 
        4 5 5 5 4 4 5 5 5 5 5 4 5 5 5 4 
        4 5 5 4 5 5 4 5 5 5 4 5 5 5 5 4 
        4 5 4 5 5 5 5 4 5 4 5 5 5 5 5 4 
        4 5 5 5 5 5 5 5 5 4 5 5 5 5 5 4 
        4 5 5 5 5 5 5 5 5 4 4 4 4 4 5 4 
        4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
        4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
        `)) {
        timer.throttle("action", 2, function () {
            timer.after(3000, function () {
                honeyGlob = sprites.create(img`
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
                    `, SpriteKind.Token)
                sprites.setDataString(honeyGlob, "Effect", "Candy")
                sprites.setDataString(honeyGlob, "Status", "Inactive")
                honeyGlob.lifespan = 5000
                honeyGlob.z = -1
                tiles.placeOnTile(honeyGlob, tiles.getTileLocation(col, row))
            })
        })
    }
}
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 0, function (status) {
    game.setDialogFrame(img`
            f f f f f f f f f f f f f f f f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f f f f f f f f f f f f f f f f
        `)
    game.setDialogCursor(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)
    game.showLongText("You got eaten!", DialogLayout.Full)
    game.reset()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Honey, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") + playerOneBees.length * 50 * blockSettings.readNumber("Multiplier"))
    sprite.sayText("+" + playerOneBees.length * 50 * blockSettings.readNumber("Multiplier") + " honey!", 2500, false)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
scene.onOverlapTile(SpriteKind.Wave, assets.tile`myTile10`, function (sprite, location) {
    statusbar.value += 6
    tiles.setTileAt(location, assets.tile`myTile27`)
    timer.after(cooldown + 0, function () {
        tiles.setTileAt(location, assets.tile`myTile10`)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile52`, function (sprite, location) {
    statusbar3.value += -3
})
function number_of_bees (list: string[], text: string) {
    instances = 0
    for (let value of list) {
        if (value == text) {
            instances += 1
        }
    }
    return instances
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile44`, function (sprite, location) {
    sprite.sayText(playerOneUpgrades[5], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneUpgrades[5] == "Duodecuple Storage - 600000 Honey") {
            if (blockSettings.readNumber("Honey") >= 600000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 600000)
                blockSettings.writeNumber("Max Storage", blockSettings.readNumber("Max Storage") * 12)
                statusbar.max = blockSettings.readNumber("Max Storage")
                statusbar.max += playerOneBees.length * 10 * number_of_bees(playerOneBees, "Robot Bee")
                playerOneUpgrades[5] = "Owned"
                blockSettings.writeStringArray("Storage Upgrades", playerOneUpgrades)
                console.log("storage upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Wave, assets.tile`myTile62`, function (sprite, location) {
    statusbar.value += 30
    tiles.setTileAt(location, assets.tile`myTile63`)
    timer.after(cooldown + 0, function () {
        tiles.setTileAt(location, assets.tile`myTile62`)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile15`, function (sprite, location) {
    tiles.placeOnTile(sprite, respawnTile)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    respawnTile = location
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    respawnTile = location
    tiles.setTileAt(location, assets.tile`myTile55`)
    timer.after(2500, function () {
        tiles.setTileAt(location, assets.tile`myTile16`)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile25`, function (sprite, location) {
    sprite.sayText(playerOneUpgrades[2], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneUpgrades[2] == "Sextuple Storage - 12000 Honey") {
            if (blockSettings.readNumber("Honey") >= 12000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 12000)
                blockSettings.writeNumber("Max Storage", blockSettings.readNumber("Max Storage") * 6)
                statusbar.max = blockSettings.readNumber("Max Storage")
                statusbar.max += playerOneBees.length * 10 * number_of_bees(playerOneBees, "Robot Bee")
                playerOneUpgrades[2] = "Owned"
                blockSettings.writeStringArray("Storage Upgrades", playerOneUpgrades)
                console.log("storage upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile60`, function (sprite, location) {
    sprite.sayText("Bubble Transport (1x Use) - 1000000 Honey", 100, false)
    if (controller.A.isPressed()) {
        if (playerOneBees.length >= 30) {
            if (blockSettings.readNumber("Honey") >= 1000000) {
                if (bubbleTransport) {
                bubbleTransport = false
                sprite.x += 16
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 1000000)
                console.log("bubble transport activated")
                tiles.placeOnRandomTile(sprite, assets.tile`myTile65`)
                bubbleTransport = true
                }
            }
        } else {
            sprite.sayText("You need " + (30 - playerOneBees.length) + " more bees.", 100, false)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile34`, function (sprite, location) {
    boss = true
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile12`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Token)
    sprites.destroyAllSpritesOfKind(SpriteKind.Honey)
    sprites.destroyAllSpritesOfKind(SpriteKind.Tree)
    sprites.destroyAllSpritesOfKind(SpriteKind.MorphFruit)
    for (let value of sprites.allOfKind(SpriteKind.Bee)) {
        if (sprites.readDataString(value, "Player") == "Player One Bee") {
            value.setPosition(sprite.x, sprite.y)
        }
    }
    mySprite2 = sprites.create(img`
        .........................
        .........................
        .........fffffff.........
        ........fffffffff........
        ........fffffffff........
        ........ffff2ffff........
        ........fff222fff........
        ........ffff2ffff........
        ........fff222fff........
        ........ffff2ffff........
        ........fffffffff........
        .ffff....fffffff....ffff.
        f....f....fffff....f....f
        ......fffffffffffff......
        .ffff....fffffff....ffff.
        f....fffffffffffffff....f
        .fff.....fffffff.....fff.
        f...fffffffffffffffff...f
        .........fffffff.........
        ....ffffff2fff2ffffff....
        ..ff.....fffffff.....ff..
        .f.......ff2f2ff.......f.
        ..........fffff..........
        .........................
        .........................
    `, SpriteKind.Boss)
    animation.runImageAnimation(
    mySprite2,
    [img`
        .........................
        .........................
        .........fffffff.........
        ........fffffffff........
        ........fffffffff........
        ........ffff2ffff........
        ........fff222fff........
        ........ffff2ffff........
        ........fff222fff........
        ........ffff2ffff........
        ........fffffffff........
        .ffff....fffffff....ffff.
        .....f....fffff....f....f
        ......fffffffffffff......
        .ffff....fffffff....ffff.
        f....fffffffffffffff.....
        .fff.....fffffff.....fff.
        ....fffffffffffffffff...f
        .........fffffff.........
        ....ffffff2fff2ffffff....
        ..ff.....fffffff.....ff..
        .f.......ff2f2ff.........
        ..........fffff..........
        .........................
        .........................
        `,img`
        .........................
        .........................
        .........fffffff.........
        ........fffffffff........
        ........fffffffff........
        ........ffff2ffff........
        ........fff222fff........
        ........ffff2ffff........
        ........fff222fff........
        ........ffff2ffff........
        ........fffffffff........
        .ffff....fffffff....ffff.
        f....f....fffff....f.....
        ......fffffffffffff......
        .ffff....fffffff....ffff.
        .....fffffffffffffff.....
        .fff.....fffffff.....fff.
        f...fffffffffffffffff....
        .........fffffff.........
        ....ffffff2fff2ffffff....
        ..ff.....fffffff.....ff..
        .........ff2f2ff.......f.
        ..........fffff..........
        .........................
        .........................
        `],
    500,
    true
    )
    mySprite2.changeScale(3, ScaleAnchor.Middle)
    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile50`)
    mySprite2.follow(mySprite, 10)
    statusbar4 = statusbars.create(40, 6, StatusBarKind.BossHealth)
    statusbar4.attachToSprite(mySprite2, 25, 0)
    statusbar4.max = playerOneBees.length * 3000
    statusbar4.value = statusbar4.max
    statusbar4.setLabel("Queen Spider")
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile42`, function (sprite, location) {
    sprite.sayText(playerOneGear[5], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneGear[5] == "+12 Collecting Efficiency - 32000 Honey") {
            if (blockSettings.readNumber("Honey") >= 32000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 32000)
                blockSettings.writeNumber("Gear Level", blockSettings.readNumber("Gear Level") + 12)
                playerOneGear[5] = "Owned"
                blockSettings.writeStringArray("Gear", playerOneGear)
                console.log("gear upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile31`, function (sprite, location) {
    sprite.sayText("Press 'B' to open morph menu.", 100, false)
    if (controller.B.isPressed()) {
        if (blockSettings.readNumber("Morph Fruits") >= 1) {
            if (morph) {
                morph = false
                canMorph = true
                beesToMorph = []
                for (let value2 of playerOneBees) {
                    if (value2 == "Average Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Average Bee", img`
                            . . . . f f . . . . 
                            . . . f f f f . . . 
                            . . . f f f f . . . 
                            . . . 5 5 5 5 . . . 
                            9 9 9 f f f f 9 9 9 
                            9 9 9 5 5 5 5 9 9 9 
                            9 9 9 f f f f 9 9 9 
                            . . . 5 5 5 5 . . . 
                            . . . f 5 5 f . . . 
                            . . . 5 5 5 5 . . . 
                            `))
                    } else if (value2 == "Boring Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Boring Bee", img`
                            . . . . b b . . . . 
                            . . . b b b b . . . 
                            . . . b b b b . . . 
                            . . . d d d d . . . 
                            9 9 9 b b b b 9 9 9 
                            9 9 9 d d d d 9 9 9 
                            9 9 9 b b b b 9 9 9 
                            . . . d d d d . . . 
                            . . . f d d f . . . 
                            . . . d d d d . . . 
                            `))
                    } else if (value2 == "Dirty Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Dirty Bee", img`
                            . . . . e e . . . . 
                            . . . e e e e . . . 
                            . . . e e e e . . . 
                            . . . d d d d . . . 
                            9 9 9 e e e e 9 9 9 
                            9 9 9 d d d d 9 9 9 
                            9 9 9 e e e e 9 9 9 
                            . . . d d d d . . . 
                            . . . f d d f . . . 
                            . . . d d d d . . . 
                            `))
                    } else if (value2 == "Grass Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Grass Bee", img`
                            . . . . 6 6 . . . . 
                            . . . 6 6 6 6 . . . 
                            . . . 6 6 6 6 . . . 
                            . . . 7 7 7 7 . . . 
                            9 9 9 6 6 6 6 9 9 9 
                            9 9 9 7 7 7 7 9 9 9 
                            9 9 9 6 6 6 6 9 9 9 
                            . . . 7 7 7 7 . . . 
                            . . . f 7 7 f . . . 
                            . . . 7 7 7 7 . . . 
                            `))
                    } else if (value2 == "Tree Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Tree Bee", img`
                            . . . . e e . . . . 
                            . . . e e e e . . . 
                            . . . e e e e . . . 
                            . . . 7 7 7 7 . . . 
                            9 9 9 e e e e 9 9 9 
                            9 9 9 7 7 7 7 9 9 9 
                            9 9 9 e e e e 9 9 9 
                            . . . 7 7 7 7 . . . 
                            . . . f 7 7 f . . . 
                            . . . 7 7 7 7 . . . 
                            `))
                    } else if (value2 == "Blazing Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Blazing Bee", img`
                            . . . . 2 2 . . . . 
                            . . . 2 2 2 2 . . . 
                            . . . 2 2 2 2 . . . 
                            . . . 4 4 4 4 . . . 
                            9 9 9 2 2 2 2 9 9 9 
                            9 9 9 4 4 4 4 9 9 9 
                            9 9 9 2 2 2 2 9 9 9 
                            . . . 4 4 4 4 . . . 
                            . . . f 4 4 f . . . 
                            . . . 4 4 4 4 . . . 
                            `))
                    } else if (value2 == "Freezing Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Freezing Bee", img`
                            . . . . 6 6 . . . . 
                            . . . 6 6 6 6 . . . 
                            . . . 6 6 6 6 . . . 
                            . . . 9 9 9 9 . . . 
                            9 9 9 6 6 6 6 9 9 9 
                            9 9 9 9 9 9 9 9 9 9 
                            9 9 9 6 6 6 6 9 9 9 
                            . . . 9 9 9 9 . . . 
                            . . . f 9 9 f . . . 
                            . . . 9 9 9 9 . . . 
                            `))
                    } else if (value2 == "Robot Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Robot Bee", img`
                            . . . . f f . . . . 
                            . . . f f f f . . . 
                            . . . f f f f . . . 
                            . . . c a 5 b . . . 
                            9 9 9 f f f f 9 9 9 
                            9 9 9 c 8 2 b 9 9 9 
                            9 9 9 f f f f 9 9 9 
                            . . . b 4 7 b . . . 
                            . . . f c c f . . . 
                            . . . b c c c . . . 
                            `))
                    } else if (value2 == "Rocket Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Rocket Bee", img`
                            . . . . 2 2 . . . . 
                            . . . 2 4 4 2 . . . 
                            . . . 2 5 5 2 . . . 
                            . . . c c c c . . . 
                            9 9 9 b b b b 9 9 9 
                            9 9 9 c c c c 9 9 9 
                            9 9 9 b b b b 9 9 9 
                            . . . c c c c . . . 
                            . . . f c c f . . . 
                            . . . c c c c . . . 
                            `))
                    } else if (value2 == "Rainbow Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Rainbow Bee", img`
                            . . . . 2 2 . . . . 
                            . . . 2 2 2 2 . . . 
                            . . . 2 2 2 2 . . . 
                            . . . 8 8 8 8 . . . 
                            9 9 9 5 5 5 5 9 9 9 
                            9 9 9 7 7 7 7 9 9 9 
                            9 9 9 a a a a 9 9 9 
                            . . . 4 4 4 4 . . . 
                            . . . f 4 4 f . . . 
                            . . . 4 4 4 4 . . . 
                            `))
                    } else if (value2 == "Portal Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Portal Bee", img`
                            . . . . 9 9 . . . . 
                            . . . 9 9 9 9 . . . 
                            . . . 9 9 9 9 . . . 
                            . . . 6 6 6 6 . . . 
                            9 9 9 f f f f 9 9 9 
                            9 9 9 8 8 8 8 9 9 9 
                            9 9 9 f f f f 9 9 9 
                            . . . 8 8 8 8 . . . 
                            . . . f 8 8 f . . . 
                            . . . 8 8 8 8 . . . 
                            `))
                    } else if (value2 == "Paper Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Paper Bee", img`
                            . . . . d d . . . . 
                            . . . d d d d . . . 
                            . . . d d d d . . . 
                            . . . 1 1 1 1 . . . 
                            9 9 9 d d d d 9 9 9 
                            9 9 9 1 1 1 1 9 9 9 
                            9 9 9 d d d d 9 9 9 
                            . . . 1 1 1 1 . . . 
                            . . . f 1 1 f . . . 
                            . . . 1 1 1 1 . . . 
                            `))
                    } else if (value2 == "Mud Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Mud Bee", img`
                            . . . . e e . . . . 
                            . . . e e e e . . . 
                            . . . e e e e . . . 
                            . . . e e e e . . . 
                            9 9 9 e e e e 9 9 9 
                            9 9 9 e e e e 9 9 9 
                            9 9 9 e e e e 9 9 9 
                            . . . e e e e . . . 
                            . . . f e e f . . . 
                            . . . e e e e . . . 
                            `))
                    } else if (value2 == "Mechanic Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Mechanic Bee", img`
                            . . . . f f . . . . 
                            . . . f f f f . . . 
                            . . . f f f f . . . 
                            . . . b b b b . . . 
                            9 9 9 f f f f 9 9 9 
                            9 9 9 b b b b 9 9 9 
                            9 9 9 f f f f 9 9 9 
                            . . . b b b b . . . 
                            . . . f b b f . . . 
                            . . . b b b b . . . 
                            `))
                    } else if (value2 == "Iron Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Iron Bee", img`
                            . . . . b b . . . . 
                            . . . b b b b . . . 
                            . . . b b b b . . . 
                            . . . c c c c . . . 
                            9 9 9 b b b b 9 9 9 
                            9 9 9 c c c c 9 9 9 
                            9 9 9 b b b b 9 9 9 
                            . . . c c c c . . . 
                            . . . f c c f . . . 
                            . . . c c c c . . . 
                            `))
                    } else if (value2 == "Aquatic Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Aquatic Bee", img`
                            . . . . 8 8 . . . . 
                            . . . 8 8 8 8 . . . 
                            . . . 8 8 8 8 . . . 
                            . . . 6 6 6 6 . . . 
                            9 9 9 8 8 8 8 9 9 9 
                            9 9 9 6 6 6 6 9 9 9 
                            9 9 9 8 8 8 8 9 9 9 
                            . . . 6 6 6 6 . . . 
                            . . . f 6 6 f . . . 
                            . . . 6 6 6 6 . . . 
                            `))
                    } else if (value2 == "Candy Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Candy Bee", img`
                            . . . . a a . . . . 
                            . . . a a a a . . . 
                            . . . a a a a . . . 
                            . . . 2 2 2 2 . . . 
                            9 9 9 a a a a 9 9 9 
                            9 9 9 2 2 2 2 9 9 9 
                            9 9 9 a a a a 9 9 9 
                            . . . 2 2 2 2 . . . 
                            . . . f 2 2 f . . . 
                            . . . 2 2 2 2 . . . 
                            `))
                    } else if (value2 == "Commando Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Commando Bee", img`
                            . . . . f f . . . . 
                            . . . f f f f . . . 
                            . . . f f f f . . . 
                            . . . e e 7 7 . . . 
                            9 9 9 f f e e 9 9 9 
                            9 9 9 7 7 f f 9 9 9 
                            9 9 9 e e 7 7 9 9 9 
                            . . . 7 7 e e . . . 
                            . . . f 7 e f . . . 
                            . . . e e 7 e . . . 
                            `))
                    } else if (value2 == "Lightning Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Lightning Bee", img`
                            . . . . 1 1 . . . . 
                            . . . 1 1 1 1 . . . 
                            . . . 1 1 1 1 . . . 
                            . . . 5 5 5 5 . . . 
                            9 9 9 1 1 1 1 9 9 9 
                            9 9 9 5 5 5 5 9 9 9 
                            9 9 9 1 1 1 1 9 9 9 
                            . . . 5 5 5 5 . . . 
                            . . . f 5 5 f . . . 
                            . . . 5 5 5 5 . . . 
                            `))
                    } else if (value2 == "Radioactive Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Radioactive Bee", img`
                            . . . . 2 2 . . . . 
                            . . . 2 2 2 2 . . . 
                            . . . 2 2 2 2 . . . 
                            . . . 7 7 7 7 . . . 
                            9 9 9 2 2 2 2 9 9 9 
                            9 9 9 7 7 7 7 9 9 9 
                            9 9 9 2 2 2 2 9 9 9 
                            . . . 7 7 7 7 . . . 
                            . . . 2 7 7 2 . . . 
                            . . . 7 7 7 7 . . . 
                            `))
                    } else if (value2 == "Flower Bee") {
                        beesToMorph.push(miniMenu.createMenuItem("Flower Bee", img`
                            . . . . 1 1 . . . . 
                            . . . 1 5 5 1 . . . 
                            . . . 1 5 5 1 . . . 
                            . . . e 1 1 e . . . 
                            9 9 9 5 5 5 5 9 9 9 
                            9 9 9 e e e e 9 9 9 
                            9 9 9 5 5 5 5 9 9 9 
                            . . . e e e e . . . 
                            . . . f e e f . . . 
                            . . . e e e e . . . 
                            `))
                    }
                }
                beesToMorph.push(miniMenu.createMenuItem("Close"))
                myMenu = miniMenu.createMenuFromArray(beesToMorph)
                console.log("morph menu opened")
                myMenu.setDimensions(160, 120)
                myMenu.setPosition(sprite.x - 0, sprite.y - 0)
                myMenu.z = 1000000
                controller.moveSprite(sprite, 0, 0)
                myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
                    myMenu.close()
                    sprites.destroyAllSpritesOfKind(SpriteKind.MiniMenu)
                    controller.moveSprite(sprite, vx, vy)
                    morph = true
                    if (selection == "Close") {
                    	
                    } else {
                        playerOneBees.removeAt(playerOneBees.indexOf(selection))
                        for (let value of sprites.allOfKind(SpriteKind.Bee)) {
                            if (sprites.readDataString(value, "Player") == "Player One Bee") {
                                if (sprites.readDataString(value, "Type") == selection) {
                                    if (canMorph) {
                                        canMorph = false
                                        sprites.destroy(value)
                                        blockSettings.writeNumber("Morph Fruits", blockSettings.readNumber("Morph Fruits") - 1)
                                        console.log("-1 morph fruit")
                                        if (Math.percentChance(50)) {
                                            if (Math.percentChance(15)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 4 4 4 4 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    . . . 4 4 4 4 . . . 
                                                    . . . f 4 4 f . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    `, SpriteKind.Bee), "Blazing Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 4 4 4 4 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    . . . 4 4 4 4 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . . 2 2 . . . . 
                                                    `], [img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 4 4 4 4 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    . . . 4 4 4 4 . . . 
                                                    . . . f 4 4 f . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . 2 2 4 2 4 2 4 4 . 
                                                    2 2 2 4 2 4 2 4 4 . 
                                                    2 2 2 4 2 4 2 4 4 . 
                                                    . 2 2 4 2 4 2 4 4 . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . 4 4 2 4 2 4 2 2 . 
                                                    . 4 4 2 4 2 4 2 2 2 
                                                    . 4 4 2 4 2 4 2 2 2 
                                                    . 4 4 2 4 2 4 2 2 . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Epic", 35)
                                                hatchedBee = "Blazing Bee"
                                                playerOneBees.push("Blazing Bee")
                                                achievements.create("You got a blazing bee! EPIC", 2, "", img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 4 4 4 4 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    . . . 4 4 4 4 . . . 
                                                    . . . f 4 4 f . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    `)
                                            } else if (Math.percentChance(15)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . 6 6 . . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    9 9 9 9 9 9 9 9 9 9 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . f 9 9 f . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    `, SpriteKind.Bee), "Freezing Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    9 9 9 9 9 9 9 9 9 9 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . . 6 6 . . . . 
                                                    `], [img`
                                                    . . . . 6 6 . . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    9 9 9 9 9 9 9 9 9 9 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . f 9 9 f . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . 6 6 9 6 9 6 9 9 . 
                                                    6 6 6 9 6 9 6 9 9 . 
                                                    6 6 6 9 6 9 6 9 9 . 
                                                    . 6 6 9 6 9 6 9 9 . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . 9 9 6 9 6 9 6 6 . 
                                                    . 9 9 6 9 6 9 6 6 6 
                                                    . 9 9 6 9 6 9 6 6 6 
                                                    . 9 9 6 9 6 9 6 6 . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Epic", 25)
                                                hatchedBee = "Freezing Bee"
                                                playerOneBees.push("Freezing Bee")
                                                achievements.create("You got a freezing bee! EPIC", 2, "", img`
                                                    . . . . 6 6 . . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    9 9 9 9 9 9 9 9 9 9 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . f 9 9 f . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    `)
                                            } else if (Math.percentChance(10)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . f f . . . . 
                                                    . . . f f f f . . . 
                                                    . . . f f f f . . . 
                                                    . . . c a 5 b . . . 
                                                    9 9 9 f f f f 9 9 9 
                                                    9 9 9 c 8 2 b 9 9 9 
                                                    9 9 9 f f f f 9 9 9 
                                                    . . . b 4 7 b . . . 
                                                    . . . f c c f . . . 
                                                    . . . b c c c . . . 
                                                    `, SpriteKind.Bee), "Robot Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . b c c c . . . 
                                                    . . . b 4 7 b . . . 
                                                    9 9 9 f f f f 9 9 9 
                                                    9 9 9 c 8 2 b 9 9 9 
                                                    9 9 9 f f f f 9 9 9 
                                                    . . . c a 5 b . . . 
                                                    . . . f f f f . . . 
                                                    . . . f f f f . . . 
                                                    . . . . f f . . . . 
                                                    `], [img`
                                                    . . . . f f . . . . 
                                                    . . . f f f f . . . 
                                                    . . . f f f f . . . 
                                                    . . . c a 5 b . . . 
                                                    9 9 9 f f f f 9 9 9 
                                                    9 9 9 c 8 2 b 9 9 9 
                                                    9 9 9 f f f f 9 9 9 
                                                    . . . b 4 7 b . . . 
                                                    . . . f c c f . . . 
                                                    . . . b c c c . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . f f c f c f b b . 
                                                    f f f a f 8 f 4 c . 
                                                    f f f 5 f 2 f 7 c . 
                                                    . f f b f b f b c . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . b b f c f c f f . 
                                                    . c 4 f 8 f a f f f 
                                                    . c 7 f 2 f 5 f f f 
                                                    . c b f b f b f f . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Legendary", 35)
                                                hatchedBee = "Robot Bee"
                                                playerOneBees.push("Robot Bee")
                                                achievements.create("You got a robot bee! LEGENDARY", 2, "", img`
                                                    . . . . f f . . . . 
                                                    . . . f f f f . . . 
                                                    . . . f f f f . . . 
                                                    . . . c a 5 b . . . 
                                                    9 9 9 f f f f 9 9 9 
                                                    9 9 9 c 8 2 b 9 9 9 
                                                    9 9 9 f f f f 9 9 9 
                                                    . . . b 4 7 b . . . 
                                                    . . . f c c f . . . 
                                                    . . . b c c c . . . 
                                                    `)
                                            } else if (Math.percentChance(10)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 4 4 2 . . . 
                                                    . . . 2 5 5 2 . . . 
                                                    . . . c c c c . . . 
                                                    9 9 9 b b b b 9 9 9 
                                                    9 9 9 c c c c 9 9 9 
                                                    9 9 9 b b b b 9 9 9 
                                                    . . . c c c c . . . 
                                                    . . . f c c f . . . 
                                                    . . . c c c c . . . 
                                                    `, SpriteKind.Bee), "Rocket Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . c c c c . . . 
                                                    . . . c c c c . . . 
                                                    9 9 9 b b b b 9 9 9 
                                                    9 9 9 c c c c 9 9 9 
                                                    9 9 9 b b b b 9 9 9 
                                                    . . . c c c c . . . 
                                                    . . . 2 5 5 2 . . . 
                                                    . . . 2 4 4 2 . . . 
                                                    . . . . 2 2 . . . . 
                                                    `], [img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 4 4 2 . . . 
                                                    . . . 2 5 5 2 . . . 
                                                    . . . c c c c . . . 
                                                    9 9 9 b b b b 9 9 9 
                                                    9 9 9 c c c c 9 9 9 
                                                    9 9 9 b b b b 9 9 9 
                                                    . . . c c c c . . . 
                                                    . . . f c c f . . . 
                                                    . . . c c c c . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . 2 2 c b c b c c . 
                                                    2 4 5 c b c b c c . 
                                                    2 4 5 c b c b c c . 
                                                    . 2 2 c b c b c c . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . c c b c b c 2 2 . 
                                                    . c c b c b c 5 4 2 
                                                    . c c b c b c 5 4 2 
                                                    . c c b c b c 2 2 . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Legendary", 50)
                                                hatchedBee = "Rocket Bee"
                                                playerOneBees.push("Rocket Bee")
                                                achievements.create("You got a rocket bee! LEGENDARY", 2, "", img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 4 4 2 . . . 
                                                    . . . 2 5 5 2 . . . 
                                                    . . . c c c c . . . 
                                                    9 9 9 b b b b 9 9 9 
                                                    9 9 9 c c c c 9 9 9 
                                                    9 9 9 b b b b 9 9 9 
                                                    . . . c c c c . . . 
                                                    . . . f c c f . . . 
                                                    . . . c c c c . . . 
                                                    `)
                                            } else if (Math.percentChance(5)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 7 7 7 7 9 9 9 
                                                    9 9 9 a a a a 9 9 9 
                                                    . . . 4 4 4 4 . . . 
                                                    . . . f 4 4 f . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    `, SpriteKind.Bee), "Rainbow Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    9 9 9 a a a a 9 9 9 
                                                    9 9 9 7 7 7 7 9 9 9 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . . 2 2 . . . . 
                                                    `], [img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 7 7 7 7 9 9 9 
                                                    9 9 9 a a a a 9 9 9 
                                                    . . . 4 4 4 4 . . . 
                                                    . . . f 4 4 f . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . 2 2 8 5 7 a 4 4 . 
                                                    2 2 2 8 5 7 a 4 4 . 
                                                    2 2 2 8 5 7 a 4 4 . 
                                                    . 2 2 8 5 7 a 4 4 . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . 4 4 a 7 5 8 2 2 . 
                                                    . 4 4 a 7 5 8 2 2 2 
                                                    . 4 4 a 7 5 8 2 2 2 
                                                    . 4 4 a 7 5 8 2 2 . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Mythic", 30)
                                                hatchedBee = "Rainbow Bee"
                                                playerOneBees.push("Rainbow Bee")
                                                achievements.create("You got a rainbow bee! MYTHIC", 2, "", img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 7 7 7 7 9 9 9 
                                                    9 9 9 a a a a 9 9 9 
                                                    . . . 4 4 4 4 . . . 
                                                    . . . f 4 4 f . . . 
                                                    . . . 4 4 4 4 . . . 
                                                    `)
                                            } else if (Math.percentChance(5)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . 9 9 . . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    9 9 9 f f f f 9 9 9 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    9 9 9 f f f f 9 9 9 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . f 8 8 f . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    `, SpriteKind.Bee), "Portal Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    9 9 9 f f f f 9 9 9 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    9 9 9 f f f f 9 9 9 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . . 9 9 . . . . 
                                                    `], [img`
                                                    . . . . 9 9 . . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    9 9 9 f f f f 9 9 9 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    9 9 9 f f f f 9 9 9 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . f 8 8 f . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . 9 9 6 f 8 f 8 8 . 
                                                    9 9 9 6 f 8 f 8 8 . 
                                                    9 9 9 6 f 8 f 8 8 . 
                                                    . 9 9 6 f 8 f 8 8 . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . 8 8 f 8 f 6 9 9 . 
                                                    . 8 8 f 8 f 6 9 9 9 
                                                    . 8 8 f 8 f 6 9 9 9 
                                                    . 8 8 f 8 f 6 9 9 . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Mythic", 30)
                                                hatchedBee = "Portal Bee"
                                                playerOneBees.push("Portal Bee")
                                                achievements.create("You got a portal bee! MYTHIC", 2, "", img`
                                                    . . . . 9 9 . . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . 9 9 9 9 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    9 9 9 f f f f 9 9 9 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    9 9 9 f f f f 9 9 9 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . f 8 8 f . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    `)
                                            } else {
                                                if (Math.percentChance(50)) {
                                                    spawn_bee(sprites.create(img`
                                                        . . . . 6 6 . . . . 
                                                        . . . 6 6 6 6 . . . 
                                                        . . . 6 6 6 6 . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        9 9 9 6 6 6 6 9 9 9 
                                                        9 9 9 7 7 7 7 9 9 9 
                                                        9 9 9 6 6 6 6 9 9 9 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . f 7 7 f . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        `, SpriteKind.Bee), "Grass Bee", "Player One Bee", [img`
                                                        . . . . . . . . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        9 9 9 6 6 6 6 9 9 9 
                                                        9 9 9 7 7 7 7 9 9 9 
                                                        9 9 9 6 6 6 6 9 9 9 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . 6 6 6 6 . . . 
                                                        . . . 6 6 6 6 . . . 
                                                        . . . . 6 6 . . . . 
                                                        `], [img`
                                                        . . . . 6 6 . . . . 
                                                        . . . 6 6 6 6 . . . 
                                                        . . . 6 6 6 6 . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        9 9 9 6 6 6 6 9 9 9 
                                                        9 9 9 7 7 7 7 9 9 9 
                                                        9 9 9 6 6 6 6 9 9 9 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . f 7 7 f . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        `], [img`
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . 6 6 7 6 7 6 7 7 . 
                                                        6 6 6 7 6 7 6 7 7 . 
                                                        6 6 6 7 6 7 6 7 7 . 
                                                        . 6 6 7 6 7 6 7 7 . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        `], [img`
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . 7 7 6 7 6 7 6 6 . 
                                                        . 7 7 6 7 6 7 6 6 6 
                                                        . 7 7 6 7 6 7 6 6 6 
                                                        . 7 7 6 7 6 7 6 6 . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        `], "Rare", 30)
                                                    hatchedBee = "Grass Bee"
                                                    playerOneBees.push("Grass Bee")
                                                    achievements.create("You got a grass bee! RARE", 2, "", img`
                                                        . . . . 6 6 . . . . 
                                                        . . . 6 6 6 6 . . . 
                                                        . . . 6 6 6 6 . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        9 9 9 6 6 6 6 9 9 9 
                                                        9 9 9 7 7 7 7 9 9 9 
                                                        9 9 9 6 6 6 6 9 9 9 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . f 7 7 f . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        `)
                                                } else {
                                                    spawn_bee(sprites.create(img`
                                                        . . . . e e . . . . 
                                                        . . . e e e e . . . 
                                                        . . . e e e e . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        9 9 9 e e e e 9 9 9 
                                                        9 9 9 7 7 7 7 9 9 9 
                                                        9 9 9 e e e e 9 9 9 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . f 7 7 f . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        `, SpriteKind.Bee), "Tree Bee", "Player One Bee", [img`
                                                        . . . . . . . . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        9 9 9 e e e e 9 9 9 
                                                        9 9 9 7 7 7 7 9 9 9 
                                                        9 9 9 e e e e 9 9 9 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . e e e e . . . 
                                                        . . . e e e e . . . 
                                                        . . . . e e . . . . 
                                                        `], [img`
                                                        . . . . e e . . . . 
                                                        . . . e e e e . . . 
                                                        . . . e e e e . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        9 9 9 e e e e 9 9 9 
                                                        9 9 9 7 7 7 7 9 9 9 
                                                        9 9 9 e e e e 9 9 9 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . f 7 7 f . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        `], [img`
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . e e 7 e 7 e 7 7 . 
                                                        e e e 7 e 7 e 7 7 . 
                                                        e e e 7 e 7 e 7 7 . 
                                                        . e e 7 e 7 e 7 7 . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        `], [img`
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . 7 7 e 7 e 7 e e . 
                                                        . 7 7 e 7 e 7 e e e 
                                                        . 7 7 e 7 e 7 e e e 
                                                        . 7 7 e 7 e 7 e e . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        `], "Rare", 30)
                                                    hatchedBee = "Tree Bee"
                                                    playerOneBees.push("Tree Bee")
                                                    achievements.create("You got a tree bee! RARE", 2, "", img`
                                                        . . . . e e . . . . 
                                                        . . . e e e e . . . 
                                                        . . . e e e e . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        9 9 9 e e e e 9 9 9 
                                                        9 9 9 7 7 7 7 9 9 9 
                                                        9 9 9 e e e e 9 9 9 
                                                        . . . 7 7 7 7 . . . 
                                                        . . . f 7 7 f . . . 
                                                        . . . 7 7 7 7 . . . 
                                                        `)
                                                }
                                            }
                                        } else {
                                            if (Math.percentChance(15)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . 8 8 . . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . f 6 6 f . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    `, SpriteKind.Bee), "Aquatic Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . . 8 8 . . . . 
                                                    `], [img`
                                                    . . . . 8 8 . . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . f 6 6 f . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . 8 8 6 8 6 8 6 6 . 
                                                    8 8 8 6 8 6 8 6 6 . 
                                                    8 8 8 6 8 6 8 6 6 . 
                                                    . 8 8 6 8 6 8 6 6 . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . 6 6 8 6 8 6 8 8 . 
                                                    . 6 6 8 6 8 6 8 8 8 
                                                    . 6 6 8 6 8 6 8 8 8 
                                                    . 6 6 8 6 8 6 8 8 . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Epic", 30)
                                                hatchedBee = "Aquatic Bee"
                                                playerOneBees.push("Aquatic Bee")
                                                achievements.create("You got an aquatic bee! EPIC", 2, "", img`
                                                    . . . . 8 8 . . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . 8 8 8 8 . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    9 9 9 6 6 6 6 9 9 9 
                                                    9 9 9 8 8 8 8 9 9 9 
                                                    . . . 6 6 6 6 . . . 
                                                    . . . f 6 6 f . . . 
                                                    . . . 6 6 6 6 . . . 
                                                    `)
                                            } else if (Math.percentChance(15)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . a a . . . . 
                                                    . . . a a a a . . . 
                                                    . . . a a a a . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    9 9 9 a a a a 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 a a a a 9 9 9 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . f 2 2 f . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    `, SpriteKind.Bee), "Candy Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    9 9 9 a a a a 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 a a a a 9 9 9 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . a a a a . . . 
                                                    . . . a a a a . . . 
                                                    . . . . a a . . . . 
                                                    `], [img`
                                                    . . . . a a . . . . 
                                                    . . . a a a a . . . 
                                                    . . . a a a a . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    9 9 9 a a a a 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 a a a a 9 9 9 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . f 2 2 f . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . a a 2 a 2 a 2 2 . 
                                                    a a a 2 a 2 a 2 2 . 
                                                    a a a 2 a 2 a 2 2 . 
                                                    . a a 2 a 2 a 2 2 . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . 2 2 a 2 a 2 a a . 
                                                    . 2 2 a 2 a 2 a a a 
                                                    . 2 2 a 2 a 2 a a a 
                                                    . 2 2 a 2 a 2 a a . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Epic", 25)
                                                hatchedBee = "Candy Bee"
                                                playerOneBees.push("Candy Bee")
                                                achievements.create("You got a candy bee! EPIC", 2, "", img`
                                                    . . . . a a . . . . 
                                                    . . . a a a a . . . 
                                                    . . . a a a a . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    9 9 9 a a a a 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 a a a a 9 9 9 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . f 2 2 f . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    `)
                                            } else if (Math.percentChance(10)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . f f . . . . 
                                                    . . . f f f f . . . 
                                                    . . . f f f f . . . 
                                                    . . . e e 7 7 . . . 
                                                    9 9 9 f f e e 9 9 9 
                                                    9 9 9 7 7 f f 9 9 9 
                                                    9 9 9 e e 7 7 9 9 9 
                                                    . . . 7 7 e e . . . 
                                                    . . . f 7 e f . . . 
                                                    . . . e e 7 e . . . 
                                                    `, SpriteKind.Bee), "Commando Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . e 7 e 7 . . . 
                                                    . . . 7 7 e e . . . 
                                                    9 9 9 e e 7 7 9 9 9 
                                                    9 9 9 7 7 f f 9 9 9 
                                                    9 9 9 f f e e 9 9 9 
                                                    . . . e e 7 7 . . . 
                                                    . . . f f f f . . . 
                                                    . . . f f f f . . . 
                                                    . . . . f f . . . . 
                                                    `], [img`
                                                    . . . . f f . . . . 
                                                    . . . f f f f . . . 
                                                    . . . f f f f . . . 
                                                    . . . e e 7 7 . . . 
                                                    9 9 9 f f e e 9 9 9 
                                                    9 9 9 7 7 f f 9 9 9 
                                                    9 9 9 e e 7 7 9 9 9 
                                                    . . . 7 7 e e . . . 
                                                    . . . f 7 e f . . . 
                                                    . . . e e 7 e . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . f f e f 7 e 7 e . 
                                                    f f f e f 7 e 7 7 . 
                                                    f f f 7 e f 7 e e . 
                                                    . f f 7 e f 7 e 7 . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . e 7 e 7 f e f f . 
                                                    . 7 7 e 7 f e f f f 
                                                    . e e 7 f e 7 f f f 
                                                    . 7 e 7 f e 7 f f . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Legendary", 35)
                                                hatchedBee = "Commando Bee"
                                                playerOneBees.push("Commando Bee")
                                                achievements.create("You got a commando bee! LEGENDARY", 2, "", img`
                                                    . . . . f f . . . . 
                                                    . . . f f f f . . . 
                                                    . . . f f f f . . . 
                                                    . . . e e 7 7 . . . 
                                                    9 9 9 f f e e 9 9 9 
                                                    9 9 9 7 7 f f 9 9 9 
                                                    9 9 9 e e 7 7 9 9 9 
                                                    . . . 7 7 e e . . . 
                                                    . . . f 7 e f . . . 
                                                    . . . e e 7 e . . . 
                                                    `)
                                            } else if (Math.percentChance(10)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . 1 1 . . . . 
                                                    . . . 1 1 1 1 . . . 
                                                    . . . 1 1 1 1 . . . 
                                                    . . . 5 5 5 5 . . . 
                                                    9 9 9 1 1 1 1 9 9 9 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 1 1 1 1 9 9 9 
                                                    . . . 5 5 5 5 . . . 
                                                    . . . f 5 5 f . . . 
                                                    . . . 5 5 5 5 . . . 
                                                    `, SpriteKind.Bee), "Lightning Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . 5 5 5 5 . . . 
                                                    . . . 5 5 5 5 . . . 
                                                    9 9 9 1 1 1 1 9 9 9 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 1 1 1 1 9 9 9 
                                                    . . . 5 5 5 5 . . . 
                                                    . . . 1 1 1 1 . . . 
                                                    . . . 1 1 1 1 . . . 
                                                    . . . . 1 1 . . . . 
                                                    `], [img`
                                                    . . . . 1 1 . . . . 
                                                    . . . 1 1 1 1 . . . 
                                                    . . . 1 1 1 1 . . . 
                                                    . . . 5 5 5 5 . . . 
                                                    9 9 9 1 1 1 1 9 9 9 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 1 1 1 1 9 9 9 
                                                    . . . 5 5 5 5 . . . 
                                                    . . . f 5 5 f . . . 
                                                    . . . 5 5 5 5 . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . 1 1 5 1 5 1 5 5 . 
                                                    1 1 1 5 1 5 1 5 5 . 
                                                    1 1 1 5 1 5 1 5 5 . 
                                                    . 1 1 5 1 5 1 5 5 . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . 5 5 1 5 1 5 1 1 . 
                                                    . 5 5 1 5 1 5 1 1 1 
                                                    . 5 5 1 5 1 5 1 1 1 
                                                    . 5 5 1 5 1 5 1 1 . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Legendary", 50)
                                                hatchedBee = "Lightning Bee"
                                                playerOneBees.push("Lightning Bee")
                                                achievements.create("You got a lightning bee! LEGENDARY", 2, "", img`
                                                    . . . . 1 1 . . . . 
                                                    . . . 1 1 1 1 . . . 
                                                    . . . 1 1 1 1 . . . 
                                                    . . . 5 5 5 5 . . . 
                                                    9 9 9 1 1 1 1 9 9 9 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 1 1 1 1 9 9 9 
                                                    . . . 5 5 5 5 . . . 
                                                    . . . f 5 5 f . . . 
                                                    . . . 5 5 5 5 . . . 
                                                    `)
                                            } else if (Math.percentChance(5)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 7 7 7 7 . . . 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 7 7 7 7 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    . . . 7 7 7 7 . . . 
                                                    . . . 2 7 7 2 . . . 
                                                    . . . 7 7 7 7 . . . 
                                                    `, SpriteKind.Bee), "Radioactive Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . 7 7 7 7 . . . 
                                                    . . . 7 7 7 7 . . . 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 7 7 7 7 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    . . . 7 7 7 7 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . . 2 2 . . . . 
                                                    `], [img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 7 7 7 7 . . . 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 7 7 7 7 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    . . . 7 7 7 7 . . . 
                                                    . . . 2 7 7 2 . . . 
                                                    . . . 7 7 7 7 . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . 2 2 7 2 7 2 7 7 . 
                                                    2 2 2 7 2 7 2 7 7 . 
                                                    2 2 2 7 2 7 2 7 7 . 
                                                    . 2 2 7 2 7 2 7 7 . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . 7 7 2 7 2 7 2 2 . 
                                                    . 7 7 2 7 2 7 2 2 2 
                                                    . 7 7 2 7 2 7 2 2 2 
                                                    . 7 7 2 7 2 7 2 2 . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Mythic", 30)
                                                hatchedBee = "Radioactive Bee"
                                                playerOneBees.push("Radioactive Bee")
                                                achievements.create("You got a radioactive bee! MYTHIC", 2, "", img`
                                                    . . . . 2 2 . . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 2 2 2 2 . . . 
                                                    . . . 7 7 7 7 . . . 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    9 9 9 7 7 7 7 9 9 9 
                                                    9 9 9 2 2 2 2 9 9 9 
                                                    . . . 7 7 7 7 . . . 
                                                    . . . 2 7 7 2 . . . 
                                                    . . . 7 7 7 7 . . . 
                                                    `)
                                            } else if (Math.percentChance(5)) {
                                                spawn_bee(sprites.create(img`
                                                    . . . . 1 1 . . . . 
                                                    . . . 1 5 5 1 . . . 
                                                    . . . 1 5 5 1 . . . 
                                                    . . . e 1 1 e . . . 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 e e e e 9 9 9 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    . . . e e e e . . . 
                                                    . . . f e e f . . . 
                                                    . . . e e e e . . . 
                                                    `, SpriteKind.Bee), "Flower Bee", "Player One Bee", [img`
                                                    . . . . . . . . . . 
                                                    . . . e e e e . . . 
                                                    . . . e e e e . . . 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 e e e e 9 9 9 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    . . . e 1 1 e . . . 
                                                    . . . 1 5 5 1 . . . 
                                                    . . . 1 5 5 1 . . . 
                                                    . . . . 1 1 . . . . 
                                                    `], [img`
                                                    . . . . 1 1 . . . . 
                                                    . . . 1 5 5 1 . . . 
                                                    . . . 1 5 5 1 . . . 
                                                    . . . e 1 1 e . . . 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 e e e e 9 9 9 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    . . . e e e e . . . 
                                                    . . . f e e f . . . 
                                                    . . . e e e e . . . 
                                                    `], [img`
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . 1 1 e 5 e 5 e e . 
                                                    1 5 5 1 5 e 5 e e . 
                                                    1 5 5 1 5 e 5 e e . 
                                                    . 1 1 e 5 e 5 e e . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    . . . . 9 9 9 . . . 
                                                    `], [img`
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . e e 5 e 5 e 1 1 . 
                                                    . e e 5 e 5 1 5 5 1 
                                                    . e e 5 e 5 1 5 5 1 
                                                    . e e 5 e 5 e 1 1 . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    . . . 9 9 9 . . . . 
                                                    `], "Mythic", 30)
                                                hatchedBee = "Flower Bee"
                                                playerOneBees.push("Flower Bee")
                                                achievements.create("You got a flower bee! MYTHIC", 2, "", img`
                                                    . . . . 1 1 . . . . 
                                                    . . . 1 5 5 1 . . . 
                                                    . . . 1 5 5 1 . . . 
                                                    . . . e 1 1 e . . . 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    9 9 9 e e e e 9 9 9 
                                                    9 9 9 5 5 5 5 9 9 9 
                                                    . . . e e e e . . . 
                                                    . . . f e e f . . . 
                                                    . . . e e e e . . . 
                                                    `)
                                            } else {
                                                if (Math.percentChance(50)) {
                                                    spawn_bee(sprites.create(img`
                                                        . . . . f f . . . . 
                                                        . . . f f f f . . . 
                                                        . . . f f f f . . . 
                                                        . . . b b b b . . . 
                                                        9 9 9 f f f f 9 9 9 
                                                        9 9 9 b b b b 9 9 9 
                                                        9 9 9 f f f f 9 9 9 
                                                        . . . b b b b . . . 
                                                        . . . f b b f . . . 
                                                        . . . b b b b . . . 
                                                        `, SpriteKind.Bee), "Mechanic Bee", "Player One Bee", [img`
                                                        . . . . . . . . . . 
                                                        . . . b b b b . . . 
                                                        . . . b b b b . . . 
                                                        9 9 9 f f f f 9 9 9 
                                                        9 9 9 b b b b 9 9 9 
                                                        9 9 9 f f f f 9 9 9 
                                                        . . . b b b b . . . 
                                                        . . . f f f f . . . 
                                                        . . . f f f f . . . 
                                                        . . . . f f . . . . 
                                                        `], [img`
                                                        . . . . f f . . . . 
                                                        . . . f f f f . . . 
                                                        . . . f f f f . . . 
                                                        . . . b b b b . . . 
                                                        9 9 9 f f f f 9 9 9 
                                                        9 9 9 b b b b 9 9 9 
                                                        9 9 9 f f f f 9 9 9 
                                                        . . . b b b b . . . 
                                                        . . . f b b f . . . 
                                                        . . . b b b b . . . 
                                                        `], [img`
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . f f b f b f b b . 
                                                        f f f b f b f b b . 
                                                        f f f b f b f b b . 
                                                        . f f b f b f b b . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        `], [img`
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . b b f b f b f f . 
                                                        . b b f b f b f f f 
                                                        . b b f b f b f f f 
                                                        . b b f b f b f f . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        `], "Rare", 30)
                                                    hatchedBee = "Mechanic Bee"
                                                    playerOneBees.push("Mechanic Bee")
                                                    achievements.create("You got a mechanic bee! RARE", 2, "", img`
                                                        . . . . f f . . . . 
                                                        . . . f f f f . . . 
                                                        . . . f f f f . . . 
                                                        . . . b b b b . . . 
                                                        9 9 9 f f f f 9 9 9 
                                                        9 9 9 b b b b 9 9 9 
                                                        9 9 9 f f f f 9 9 9 
                                                        . . . b b b b . . . 
                                                        . . . f b b f . . . 
                                                        . . . b b b b . . . 
                                                        `)
                                                } else {
                                                    spawn_bee(sprites.create(img`
                                                        . . . . b b . . . . 
                                                        . . . b b b b . . . 
                                                        . . . b b b b . . . 
                                                        . . . c c c c . . . 
                                                        9 9 9 b b b b 9 9 9 
                                                        9 9 9 c c c c 9 9 9 
                                                        9 9 9 b b b b 9 9 9 
                                                        . . . c c c c . . . 
                                                        . . . f c c f . . . 
                                                        . . . c c c c . . . 
                                                        `, SpriteKind.Bee), "Iron Bee", "Player One Bee", [img`
                                                        . . . . . . . . . . 
                                                        . . . c c c c . . . 
                                                        . . . c c c c . . . 
                                                        9 9 9 b b b b 9 9 9 
                                                        9 9 9 c c c c 9 9 9 
                                                        9 9 9 b b b b 9 9 9 
                                                        . . . c c c c . . . 
                                                        . . . b b b b . . . 
                                                        . . . b b b b . . . 
                                                        . . . . b b . . . . 
                                                        `], [img`
                                                        . . . . b b . . . . 
                                                        . . . b b b b . . . 
                                                        . . . b b b b . . . 
                                                        . . . c c c c . . . 
                                                        9 9 9 b b b b 9 9 9 
                                                        9 9 9 c c c c 9 9 9 
                                                        9 9 9 b b b b 9 9 9 
                                                        . . . c c c c . . . 
                                                        . . . f c c f . . . 
                                                        . . . c c c c . . . 
                                                        `], [img`
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . b b c b c b c c . 
                                                        b b b c b c b c c . 
                                                        b b b c b c b c c . 
                                                        . b b c b c b c c . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        . . . . 9 9 9 . . . 
                                                        `], [img`
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . c c b c b c b b . 
                                                        . c c b c b c b b b 
                                                        . c c b c b c b b b 
                                                        . c c b c b c b b . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        . . . 9 9 9 . . . . 
                                                        `], "Rare", 25)
                                                    hatchedBee = "Iron Bee"
                                                    playerOneBees.push("Iron Bee")
                                                    achievements.create("You got an iron bee! RARE", 2, "", img`
                                                        . . . . b b . . . . 
                                                        . . . b b b b . . . 
                                                        . . . b b b b . . . 
                                                        . . . c c c c . . . 
                                                        9 9 9 b b b b 9 9 9 
                                                        9 9 9 c c c c 9 9 9 
                                                        9 9 9 b b b b 9 9 9 
                                                        . . . c c c c . . . 
                                                        . . . f c c f . . . 
                                                        . . . c c c c . . . 
                                                        `)
                                                }
                                            }
                                        }
                                        canMorph = true
                                        blockSettings.writeStringArray("Bees", playerOneBees)
                                        break;
                                    }
                                }
                            }
                        }
                    }
                })
            }
        } else {
            sprite.sayText("You don't have any morph fruits.", 2500, false)
        }
    }
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Bee, 1500, function (sprite) {
    if (Math.percentChance(75)) {
        spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(sprite, mySprite), sprites.readDataNumber(sprite, "Speed"))
    } else {
        sprite.setVelocity(0, 0)
    }
    if (Math.percentChance(5)) {
        if (sprites.readDataString(sprite, "Type") == "Blazing Bee" || sprites.readDataString(sprite, "Type") == "Rocket Bee") {
            myToken = sprites.create(img`
                . . f f f f f f . . 
                . f f f 2 f f f f . 
                f f f f 2 2 f f f f 
                f f 2 2 4 4 2 2 f f 
                f f 2 4 4 5 4 2 2 f 
                f f f 2 4 5 5 4 2 f 
                f f f 2 2 4 2 2 2 f 
                f f f f 2 2 2 f f f 
                . f f f 2 f f f f . 
                . . f f f f f f . . 
                `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Explosion")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
    if (Math.percentChance(10)) {
        if (sprites.readDataString(sprite, "Type") == "Freezing Bee") {
            myToken = sprites.create(img`
                . . 8 8 8 8 8 8 . . 
                . 8 8 8 9 8 8 8 8 . 
                8 8 8 8 9 9 8 8 8 8 
                8 8 1 9 9 1 9 8 8 8 
                8 9 9 9 9 9 9 9 9 8 
                8 8 9 9 9 9 9 1 8 8 
                8 8 8 9 1 9 9 8 8 8 
                8 8 8 8 9 9 8 8 8 8 
                . 8 8 8 9 8 8 8 8 . 
                . . 8 8 8 8 8 8 . . 
                `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Freeze")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
    if (Math.percentChance(5)) {
        if (sprites.readDataString(sprite, "Type") == "Portal Bee") {
            myToken = sprites.create(img`
                . . 8 8 8 8 8 8 . . 
                . 8 9 9 9 9 9 9 8 . 
                8 9 9 6 6 6 6 9 9 8 
                8 9 6 9 9 9 9 9 9 8 
                8 9 6 9 6 6 9 9 9 8 
                8 9 6 9 6 9 6 9 9 8 
                8 9 6 9 9 9 6 9 9 8 
                8 9 9 6 6 6 9 9 9 8 
                . 8 9 9 9 9 9 9 8 . 
                . . 8 8 8 8 8 8 . . 
                `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Portal")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
    if (Math.percentChance(5)) {
        if (sprites.readDataString(sprite, "Type") == "Rainbow Bee") {
            myToken = sprites.create(img`
                . . 9 9 9 9 9 9 . . 
                . 9 9 2 2 2 2 9 9 . 
                9 9 2 4 4 4 4 2 9 9 
                9 2 4 5 5 5 5 4 2 9 
                2 4 5 5 7 7 5 5 4 2 
                2 4 5 7 8 8 7 5 4 2 
                2 4 5 8 a a 8 5 4 2 
                1 1 1 9 9 9 9 1 1 1 
                . 9 9 9 9 9 9 9 9 . 
                . . 9 9 9 9 9 9 . . 
                `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Rainbow")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
    if (Math.percentChance(25)) {
        if (sprites.readDataString(sprite, "Type") == "Aquatic Bee") {
            projectile = sprites.create(img`
                8 8 8 8 8 8 8 8 
                8 8 8 1 9 1 8 8 
                8 8 8 9 8 9 8 8 
                8 8 8 8 8 8 8 8 
                8 8 8 8 8 8 8 8 
                8 1 9 1 8 8 8 8 
                8 9 8 9 8 8 8 8 
                8 8 8 8 8 8 8 8 
                `, SpriteKind.Wave)
            projectile.setPosition(sprite.x, sprite.y)
            projectile.setVelocity([-25, 25]._pickRandom(), [-25, 25]._pickRandom())
            projectile.lifespan = 5000
        }
    }
    if (Math.percentChance(5)) {
        if (sprites.readDataString(sprite, "Type") == "Candy Bee") {
            myToken = sprites.create(img`
                . . a a a a a a . . 
                . a a a a a a a a . 
                a a a a a a a a a a 
                a 2 a 1 2 2 1 a 2 a 
                a 2 1 2 2 1 2 2 1 a 
                a 1 2 2 1 2 2 1 2 a 
                a 2 a 1 2 2 1 a 2 a 
                a a a a a a a a a a 
                . a a a a a a a a . 
                . . a a a a a a . . 
                `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Candy")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
    if (Math.percentChance(5)) {
        if (sprites.readDataString(sprite, "Type") == "Lightning Bee") {
            myToken = sprites.create(img`
                . . 1 1 1 1 1 1 . . 
                . 1 1 1 5 5 5 1 1 . 
                1 1 1 1 5 5 5 1 1 1 
                1 1 1 1 5 5 5 1 1 1 
                1 1 1 5 5 5 1 1 1 1 
                1 1 1 5 5 5 1 1 1 1 
                1 1 1 5 5 5 1 1 1 1 
                1 1 1 5 5 1 1 1 1 1 
                . 1 1 5 1 1 1 1 1 . 
                . . 1 1 1 1 1 1 . . 
                `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Speed")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
    if (Math.percentChance(5)) {
        if (sprites.readDataString(sprite, "Type") == "Radioactive Bee") {
            myToken = sprites.create(img`
                . . 2 2 2 2 2 2 . . 
                . 2 7 7 7 7 7 7 2 . 
                2 7 7 7 2 2 7 7 7 2 
                2 7 2 2 2 2 2 2 7 2 
                2 7 2 2 4 4 2 2 7 2 
                2 7 2 4 4 5 4 2 7 2 
                2 7 2 2 2 4 2 2 7 2 
                2 7 7 7 2 2 2 7 7 2 
                . 2 7 7 7 7 7 7 2 . 
                . . 2 2 2 2 2 2 . . 
                `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Nuke")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
    if (Math.percentChance(5)) {
        if (sprites.readDataString(sprite, "Type") == "Flower Bee") {
            myToken = sprites.create(img`
                . . 5 5 5 5 5 5 . . 
                . 5 7 7 7 7 7 7 5 . 
                5 7 7 7 7 7 7 7 7 5 
                5 7 7 7 1 1 7 7 7 5 
                5 7 7 1 5 5 1 7 7 5 
                5 7 7 1 5 5 1 7 7 5 
                5 7 7 7 1 1 7 7 7 5 
                5 7 7 7 7 7 7 7 7 5 
                . 5 7 7 7 7 7 7 5 . 
                . . 5 5 5 5 5 5 . . 
                `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Convert")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
    if (Math.percentChance(1)) {
        if (sprites.readDataString(sprite, "Type") == "Monochrome Bee") {
            myToken = sprites.create(img`
                . . f f f 1 1 1 . . 
                . f f f f 1 1 1 1 . 
                f f f f f 1 1 1 1 1 
                f f f f f 1 1 1 1 1 
                f f f f f 1 1 1 1 1 
                f f f f f 1 1 1 1 1 
                f f f f f 1 1 1 1 1 
                f f f f f 1 1 1 1 1 
                . f f f f 1 1 1 1 . 
                . . f f f 1 1 1 . . 
                `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Automatic Convert")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
    if (Math.percentChance(10)) {
        if (sprites.readDataString(sprite, "Type") == "Ultraviolet Bee") {
            myToken = sprites.create(img`
                . . 6 6 6 6 6 6 . .
                . 6 6 6 6 6 1 6 6 .
                6 6 a 6 6 1 5 1 6 6
                6 a 5 a 6 6 1 6 6 6
                6 6 a 6 6 6 6 6 6 6
                6 6 6 6 6 6 6 2 6 6
                6 6 6 8 6 6 2 5 2 6
                6 6 8 5 8 6 6 2 6 6
                . 6 6 8 6 6 6 6 6 .
                . . 6 6 6 6 6 6 . .
            `, SpriteKind.Token)
            myToken.lifespan = 10000
            sprites.setDataString(myToken, "Effect", "Pollen Boost")
            sprites.setDataString(myToken, "Status", "Inactive")
            myToken.setPosition(sprite.x, sprite.y)
            console.log("token spawned")
        }
    }
})
sprites.onOverlap(SpriteKind.Token, SpriteKind.Boss, function (sprite, otherSprite) {
    if ((sprites.readDataString(sprite, "Effect") == "Explosion" || sprites.readDataString(sprite, "Effect") == "Nuke") && sprites.readDataString(sprite, "Status") == "Active") {
        statusbars.getStatusBarAttachedTo(StatusBarKind.BossHealth, otherSprite).value += attackPower * -2
        console.log("boss took token damage")
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.BossHealth, otherSprite).value == 0) {
            sprites.destroy(otherSprite, effects.ashes, 2500)
            blockSettings.writeNumber("Spider", blockSettings.readNumber("Spider") + 1)
            music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
            game.setDialogFrame(img`
                f f f f f f f f f f f f f f f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
                f f f f f f f f f f f f f f f 
                `)
            game.showLongText("The Queen Spider has been defeated! You got a mini spider!", DialogLayout.Full)
            timer.after(2000, function () {
                game.reset()
            })
        }
    }
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Spider, 10000, function (sprite) {
    for (let value of tiles.getTilesByType(currentTile)) {
        if (Math.percentChance(5)) {
            web = sprites.create(img`
                1 . . 1 . . . . . . . . 1 . . 1 
                . 1 . . 1 . 1 1 1 1 . 1 . . 1 . 
                . . 1 . . 1 . . . . 1 . . 1 . . 
                1 . . 1 1 . 1 . . 1 . 1 1 . . 1 
                . 1 . 1 1 . 1 1 1 1 . 1 1 . 1 . 
                . . 1 . . 1 . . . . 1 . . 1 . . 
                . 1 . 1 1 . 1 . . 1 . 1 1 . 1 . 
                . 1 . . 1 . . 1 1 . . 1 . . 1 . 
                . 1 . . 1 . . 1 1 . . 1 . . 1 . 
                . 1 . 1 1 . 1 . . 1 . 1 1 . 1 . 
                . . 1 . . 1 . . . . 1 . . 1 . . 
                . 1 . 1 1 . 1 1 1 1 . 1 1 . 1 . 
                1 . . 1 1 . 1 . . 1 . 1 1 . . 1 
                . . 1 . . 1 . . . . 1 . . 1 . . 
                . 1 . . 1 . 1 1 1 1 . 1 . . 1 . 
                1 . . 1 . . . . . . . . 1 . . 1 
                `, SpriteKind.Token)
            sprites.setDataString(web, "Status", "Active")
            sprites.setDataString(web, "Effect", "Explosion")
            web.lifespan = 10000
            tiles.placeOnTile(web, value)
        }
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataString(sprite, "Enemy") == sprites.readDataString(otherSprite, "Enemy")) {
        if (spriteutils.distanceBetween(sprite, otherSprite) == 0) {
            sprites.destroy(sprite)
            sprites.destroy(statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite))
        }
    }
})
scene.onOverlapTile(SpriteKind.Wave, assets.tile`myTile2`, function (sprite, location) {
    statusbar.value += 2
    tiles.setTileAt(location, assets.tile`myTile9`)
    timer.after(cooldown + 0, function () {
        tiles.setTileAt(location, assets.tile`myTile2`)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile67`, function (sprite, location) {
    sprite.sayText(playerOneUpgrades[6], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneUpgrades[6] == "Quattuordecuple Storage - 3000000 Honey") {
            if (blockSettings.readNumber("Honey") >= 3000000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 3000000)
                blockSettings.writeNumber("Max Storage", blockSettings.readNumber("Max Storage") * 14)
                statusbar.max = blockSettings.readNumber("Max Storage")
                statusbar.max += playerOneBees.length * 10 * number_of_bees(playerOneBees, "Robot Bee")
                playerOneUpgrades[6] = "Owned"
                blockSettings.writeStringArray("Storage Upgrades", playerOneUpgrades)
                console.log("storage upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile11`, function (sprite, location) {
    sprite.sayText(playerOneGear[2], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneGear[2] == "+6 Collecting Efficiency - 4000 Honey") {
            if (blockSettings.readNumber("Honey") >= 4000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 4000)
                blockSettings.writeNumber("Gear Level", blockSettings.readNumber("Gear Level") + 6)
                playerOneGear[2] = "Owned"
                blockSettings.writeStringArray("Gear", playerOneGear)
                console.log("gear upgraded")
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    statusbar3.value += -3
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`honey`, function (sprite, location) {
    sprite.sayText("Hold 'A' to make honey.", 100, false)
    if (controller.A.isPressed()) {
        if (statusbar.value >= 1 + (playerOneBees.length + convertBonus)) {
            statusbar.value += (1 + (playerOneBees.length + convertBonus)) * -1
            blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") + (1 + (playerOneBees.length + convertBonus)) * blockSettings.readNumber("Multiplier"))
        } else if (statusbar.value > 0) {
            blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") + statusbar.value)
            statusbar.value = 0
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile28`, function (sprite, location) {
    if (number_of_bees(playerOneBees, "Monochrome Bee") == 0) {
        sprite.sayText("Claim a free monochrome bee! (Press B)", 100, false)
        if (controller.B.isPressed()) {
            spawn_bee(sprites.create(img`
                . . . . 1 1 . . . . 
                . . . 1 1 1 1 . . . 
                . . . 1 1 1 1 . . . 
                . . . f f f f . . . 
                b b b 1 1 1 1 b b b 
                b b b f f f f b b b 
                b b b 1 1 1 1 b b b 
                . . . f f f f . . . 
                . . . 1 f f 1 . . . 
                . . . f f f f . . . 
                `, SpriteKind.Bee), "Monochrome Bee", "Player One Bee", [img`
                . . . . . . . . . . 
                . . . f f f f . . . 
                . . . f f f f . . . 
                b b b 1 1 1 1 b b b 
                b b b f f f f b b b 
                b b b 1 1 1 1 b b b 
                . . . f f f f . . . 
                . . . 1 1 1 1 . . . 
                . . . 1 1 1 1 . . . 
                . . . . 1 1 . . . . 
                `], [img`
                . . . . 1 1 . . . . 
                . . . 1 1 1 1 . . . 
                . . . 1 1 1 1 . . . 
                . . . f f f f . . . 
                b b b 1 1 1 1 b b b 
                b b b f f f f b b b 
                b b b 1 1 1 1 b b b 
                . . . f f f f . . . 
                . . . 1 f f 1 . . . 
                . . . f f f f . . . 
                `], [img`
                . . . . b b b . . . 
                . . . . b b b . . . 
                . . . . b b b . . . 
                . 1 1 f 1 f 1 f f . 
                1 1 1 f 1 f 1 f f . 
                1 1 1 f 1 f 1 f f . 
                . 1 1 f 1 f 1 f f . 
                . . . . b b b . . . 
                . . . . b b b . . . 
                . . . . b b b . . . 
                `], [img`
                . . . b b b . . . . 
                . . . b b b . . . . 
                . . . b b b . . . . 
                . f f 1 f 1 f 1 1 . 
                . f f 1 f 1 f 1 1 1 
                . f f 1 f 1 f 1 1 1 
                . f f 1 f 1 f 1 1 . 
                . . . b b b . . . . 
                . . . b b b . . . . 
                . . . b b b . . . . 
                `], "Special", 25)
            hatchedBee = "Monochrome Bee"
            playerOneBees.push("Monochrome Bee")
            achievements.create("You got a monochrome bee! SPECIAL", 2, "", img`
                . . . . 1 1 . . . . 
                . . . 1 1 1 1 . . . 
                . . . 1 1 1 1 . . . 
                . . . f f f f . . . 
                b b b 1 1 1 1 b b b 
                b b b f f f f b b b 
                b b b 1 1 1 1 b b b 
                . . . f f f f . . . 
                . . . 1 f f 1 . . . 
                . . . f f f f . . . 
                `)
            blockSettings.writeStringArray("Bees", playerOneBees)
        }
    }
})
scene.onOverlapTile(SpriteKind.Token, assets.tile`myTile10`, function (sprite, location) {
    if (sprites.readDataString(sprite, "Effect") == "Explosion" || sprites.readDataString(sprite, "Effect") == "Portal") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 3
            tiles.setTileAt(location, assets.tile`myTile27`)
            timer.after(cooldown + 0, function () {
                tiles.setTileAt(location, assets.tile`myTile10`)
            })
        }
    } else if (sprites.readDataString(sprite, "Effect") == "Nuke") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 3
            tiles.setTileAt(location, assets.tile`myTile27`)
            timer.after(cooldown + 1000, function () {
                tiles.setTileAt(location, assets.tile`myTile10`)
            })
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile45`, function (sprite, location) {
    currentTile = assets.tile`myTile45`
    if (controller.A.isPressed()) {
        tiles.setTileAt(location, assets.tile`myTile46`)
        statusbar.value += blockSettings.readNumber("Gear Level") + (playerOneBees.length + (bonus + 4))
        for (let value of playerOneBees) {
            if (value == "Grass Bee") {
                statusbar.value += 5
            }
            if (value == "Rainbow Bee") {
                statusbar.value += 5
            }
            if (value == "Flower Bee") {
                statusbar.value += 5
            }
        }
        timer.after(cooldown + 0, function () {
            tiles.setTileAt(location, assets.tile`myTile45`)
        })
    }
    for (let value of spriteutils.getSpritesWithin(SpriteKind.Enemy, 150, sprite)) {
        if (sprites.readDataBoolean(value, "Follow")) {
            if (sprites.readDataString(value, "Enemy") == "Aphid") {
                value.follow(sprite, 25)
            }
        }
    }
    honey_glob(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row)
})
sprites.onOverlap(SpriteKind.Bee, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Math.percentChance(5)) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += attackPower * -1
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value == 0) {
            if (Math.percentChance(sprites.readDataNumber(otherSprite, "Chance"))) {
                morphFruitToken = sprites.create(img`
                    . . e e e e e e . . 
                    . e e e 7 e e e e . 
                    e e e e e 7 e e e e 
                    e e e 5 5 5 5 e e e 
                    e e 5 5 f 5 f 5 e e 
                    e e 5 f 5 f 5 f e e 
                    e e 5 f 5 5 5 f e e 
                    e e 5 5 5 5 5 5 e e 
                    . e e 5 5 5 5 e e . 
                    . . e e e e e e . . 
                    `, SpriteKind.MorphFruit)
                morphFruitToken.setPosition(sprite.x, sprite.y)
            } else {
                honeyToken = sprites.create(img`
                    . . 5 5 5 5 5 5 . . 
                    . 5 5 5 4 5 5 5 5 . 
                    5 5 5 4 4 5 5 5 5 5 
                    5 5 4 4 4 4 5 5 5 5 
                    5 5 4 4 4 4 5 5 5 5 
                    5 5 4 4 4 4 4 5 5 5 
                    5 5 4 4 4 4 4 5 5 5 
                    5 5 5 4 4 4 5 5 5 5 
                    . 5 5 5 5 5 5 5 5 . 
                    . . 5 5 5 5 5 5 . . 
                    `, SpriteKind.Honey)
                honeyToken.setPosition(sprite.x, sprite.y)
            }
            console.log("" + sprites.readDataString(otherSprite, "Enemy") + " defeated")
            sprites.destroy(statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite))
            sprites.destroy(otherSprite)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite, location) {
    currentTile = assets.tile`myTile10`
    if (controller.A.isPressed()) {
        tiles.setTileAt(location, assets.tile`myTile27`)
        statusbar.value += blockSettings.readNumber("Gear Level") + (playerOneBees.length + (bonus + 2))
        for (let value of playerOneBees) {
            if (value == "Grass Bee") {
                statusbar.value += 3
            }
            if (value == "Rainbow Bee") {
                statusbar.value += 3
            }
            if (value == "Flower Bee") {
                statusbar.value += 3
            }
        }
        timer.after(cooldown + 0, function () {
            tiles.setTileAt(location, assets.tile`myTile10`)
        })
    }
    for (let value of spriteutils.getSpritesWithin(SpriteKind.Enemy, 100, sprite)) {
        if (sprites.readDataBoolean(value, "Follow")) {
            if (sprites.readDataString(value, "Enemy") == "Beetle") {
                value.follow(sprite, 25)
            }
        }
    }
    honey_glob(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile23`, function (sprite, location) {
    sprite.sayText(playerOneGear[3], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneGear[3] == "+8 Collecting Efficiency - 8000 Honey") {
            if (blockSettings.readNumber("Honey") >= 8000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 8000)
                blockSettings.writeNumber("Gear Level", blockSettings.readNumber("Gear Level") + 8)
                playerOneGear[3] = "Owned"
                blockSettings.writeStringArray("Gear", playerOneGear)
                console.log("gear upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile64`, function (sprite, location) {
    sprite.sayText(playerOneGear[6], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneGear[6] == "+14 Collecting Efficiency - 320000 Honey") {
            if (blockSettings.readNumber("Honey") >= 320000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 320000)
                blockSettings.writeNumber("Gear Level", blockSettings.readNumber("Gear Level") + 14)
                playerOneGear[6] = "Owned"
                blockSettings.writeStringArray("Gear", playerOneGear)
                console.log("gear upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile12`, function (sprite, location) {
    for (let value of spriteutils.getSpritesWithin(SpriteKind.Enemy, 100, sprite)) {
        if (sprites.readDataBoolean(value, "Follow")) {
            if (sprites.readDataString(value, "Enemy") == "Golden Ladybug") {
                value.follow(sprite, 25)
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    currentTile = assets.tile`myTile2`
    if (controller.A.isPressed()) {
        tiles.setTileAt(location, assets.tile`myTile9`)
        statusbar.value += blockSettings.readNumber("Gear Level") + (playerOneBees.length + (bonus + 0))
        for (let value of playerOneBees) {
            if (value == "Grass Bee") {
                statusbar.value += 1
            }
            if (value == "Rainbow Bee") {
                statusbar.value += 1
            }
            if (value == "Flower Bee") {
                statusbar.value += 1
            }
        }
        timer.after(cooldown + 0, function () {
            tiles.setTileAt(location, assets.tile`myTile2`)
        })
    }
    honey_glob(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile18`, function (sprite, location) {
    sprite.sayText(playerOneGear[1], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneGear[1] == "+4 Collecting Efficiency - 2000 Honey") {
            if (blockSettings.readNumber("Honey") >= 2000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 2000)
                blockSettings.writeNumber("Gear Level", blockSettings.readNumber("Gear Level") + 4)
                playerOneGear[1] = "Owned"
                blockSettings.writeStringArray("Gear", playerOneGear)
                console.log("gear upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Token, assets.tile`myTile62`, function (sprite, location) {
    if (sprites.readDataString(sprite, "Effect") == "Explosion" || sprites.readDataString(sprite, "Effect") == "Portal") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 15
            tiles.setTileAt(location, assets.tile`myTile63`)
            timer.after(cooldown + 0, function () {
                tiles.setTileAt(location, assets.tile`myTile62`)
            })
        }
    } else if (sprites.readDataString(sprite, "Effect") == "Nuke") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 15
            tiles.setTileAt(location, assets.tile`myTile63`)
            timer.after(cooldown + 1000, function () {
                tiles.setTileAt(location, assets.tile`myTile62`)
            })
        }
    }
})
scene.onOverlapTile(SpriteKind.Token, assets.tile`myTile32`, function (sprite, location) {
    if (sprites.readDataString(sprite, "Effect") == "Explosion" || sprites.readDataString(sprite, "Effect") == "Portal") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 4
            tiles.setTileAt(location, assets.tile`myTile33`)
            timer.after(cooldown + 0, function () {
                tiles.setTileAt(location, assets.tile`myTile32`)
            })
        }
    } else if (sprites.readDataString(sprite, "Effect") == "Nuke") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 4
            tiles.setTileAt(location, assets.tile`myTile33`)
            timer.after(cooldown + 1000, function () {
                tiles.setTileAt(location, assets.tile`myTile32`)
            })
        }
    }
})
scene.onOverlapTile(SpriteKind.Token, assets.tile`myTile2`, function (sprite, location) {
    if (sprites.readDataString(sprite, "Effect") == "Explosion" || sprites.readDataString(sprite, "Effect") == "Portal") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 1
            tiles.setTileAt(location, assets.tile`myTile9`)
            timer.after(cooldown + 0, function () {
                tiles.setTileAt(location, assets.tile`myTile2`)
            })
        }
    } else if (sprites.readDataString(sprite, "Effect") == "Nuke") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 1
            tiles.setTileAt(location, assets.tile`myTile9`)
            timer.after(cooldown + 1000, function () {
                tiles.setTileAt(location, assets.tile`myTile2`)
            })
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.MorphFruit, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    sprite.sayText("+1 morph fruit!", 2500, false)
    blockSettings.writeNumber("Morph Fruits", blockSettings.readNumber("Morph Fruits") + 1)
    console.log("+1 morph fruit")
})
scene.onOverlapTile(SpriteKind.Token, assets.tile`myTile24`, function (sprite, location) {
    if (sprites.readDataString(sprite, "Effect") == "Explosion" || sprites.readDataString(sprite, "Effect") == "Portal") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 2
            tiles.setTileAt(location, assets.tile`myTile30`)
            timer.after(cooldown + 0, function () {
                tiles.setTileAt(location, assets.tile`myTile24`)
            })
        }
    } else if (sprites.readDataString(sprite, "Effect") == "Nuke") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 2
            tiles.setTileAt(location, assets.tile`myTile30`)
            timer.after(cooldown + 1000, function () {
                tiles.setTileAt(location, assets.tile`myTile24`)
            })
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile38`, function (sprite, location) {
    sprite.sayText("Spawn Honey Storm " + "| Cooldown: " + blockSettings.readNumber("Honey Storm Cooldown"), 100, false)
    if (controller.A.isPressed()) {
        if (number_of_bees(playerOneBees, "Rocket Bee") + (number_of_bees(playerOneBees, "Robot Bee") + (number_of_bees(playerOneBees, "Commando Bee") + number_of_bees(playerOneBees, "Lightning Bee"))) >= 4) {
            if (number_of_bees(playerOneBees, "Rainbow Bee") + (number_of_bees(playerOneBees, "Portal Bee") + (number_of_bees(playerOneBees, "Radioactive Bee") + number_of_bees(playerOneBees, "Flower Bee"))) >= 2) {
                if (blockSettings.readNumber("Honey Storm Cooldown") == 0) {
                    blockSettings.writeNumber("Honey Storm Cooldown", 300)
                    honeyStorm = true
                    color.setPalette(
                    color.Adventure
                    )
                    timer.after(20000, function () {
                        honeyStorm = false
                        color.setPalette(
                        color.originalPalette
                        )
                    })
                }
            } else {
                sprite.sayText("You need " + storage.ifThenElse(4 - (number_of_bees(playerOneBees, "Rocket Bee") + (number_of_bees(playerOneBees, "Robot Bee") + (number_of_bees(playerOneBees, "Commando Bee") + number_of_bees(playerOneBees, "Lightning Bee")))) <= 0, "0", 4 - (number_of_bees(playerOneBees, "Rocket Bee") + (number_of_bees(playerOneBees, "Robot Bee") + (number_of_bees(playerOneBees, "Commando Bee") + number_of_bees(playerOneBees, "Lightning Bee"))))) + " more legendary bees and " + storage.ifThenElse(2 - (number_of_bees(playerOneBees, "Rainbow Bee") + (number_of_bees(playerOneBees, "Portal Bee") + (number_of_bees(playerOneBees, "Radioactive Bee") + number_of_bees(playerOneBees, "Flower Bee")))) <= 0, "0", 2 - (number_of_bees(playerOneBees, "Rainbow Bee") + (number_of_bees(playerOneBees, "Portal Bee") + (number_of_bees(playerOneBees, "Radioactive Bee") + number_of_bees(playerOneBees, "Flower Bee"))))) + " more mythic bees.", 5000, false)
            }
        } else {
            sprite.sayText("You need " + storage.ifThenElse(4 - (number_of_bees(playerOneBees, "Rocket Bee") + (number_of_bees(playerOneBees, "Robot Bee") + (number_of_bees(playerOneBees, "Commando Bee") + number_of_bees(playerOneBees, "Lightning Bee")))) <= 0, "0", 4 - (number_of_bees(playerOneBees, "Rocket Bee") + (number_of_bees(playerOneBees, "Robot Bee") + (number_of_bees(playerOneBees, "Commando Bee") + number_of_bees(playerOneBees, "Lightning Bee"))))) + " more legendary bees and " + storage.ifThenElse(2 - (number_of_bees(playerOneBees, "Rainbow Bee") + (number_of_bees(playerOneBees, "Portal Bee") + (number_of_bees(playerOneBees, "Radioactive Bee") + number_of_bees(playerOneBees, "Flower Bee")))) <= 0, "0", 2 - (number_of_bees(playerOneBees, "Rainbow Bee") + (number_of_bees(playerOneBees, "Portal Bee") + (number_of_bees(playerOneBees, "Radioactive Bee") + number_of_bees(playerOneBees, "Flower Bee"))))) + " more mythic bees.", 5000, false)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile66`, function (sprite, location) {
    if (!(blockSettings.readBoolean("Ghost"))) {
        sprite.sayText("Ghost Mode - Walk Through Walls - 20000000 Honey", 100, false)
        if (controller.A.isPressed()) {
            if (blockSettings.readNumber("Honey") >= 20000000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 20000000)
                blockSettings.writeBoolean("Ghost", true)
                sprite.setFlag(SpriteFlag.GhostThroughWalls, (blockSettings.readBoolean("Ghost")))
            }
        }
    } else {
        sprite.sayText("Owned", 100, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile24`, function (sprite, location) {
    currentTile = assets.tile`myTile24`
    if (controller.A.isPressed()) {
        tiles.setTileAt(location, assets.tile`myTile30`)
        statusbar.value += blockSettings.readNumber("Gear Level") + (playerOneBees.length + (bonus + 1))
        for (let value of playerOneBees) {
            if (value == "Grass Bee") {
                statusbar.value += 2
            }
            if (value == "Rainbow Bee") {
                statusbar.value += 2
            }
            if (value == "Flower Bee") {
                statusbar.value += 2
            }
        }
        timer.after(cooldown + 0, function () {
            tiles.setTileAt(location, assets.tile`myTile24`)
        })
    }
    for (let value of spriteutils.getSpritesWithin(SpriteKind.Enemy, 150, sprite)) {
        if (sprites.readDataBoolean(value, "Follow")) {
            if (sprites.readDataString(value, "Enemy") == "Ladybug") {
                value.follow(sprite, 25)
            }
        }
    }
    honey_glob(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite, location) {
    sprite.sayText(playerOneGear[0], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneGear[0] == "+2 Collecting Efficiency - 1000 Honey") {
            if (blockSettings.readNumber("Honey") >= 1000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 1000)
                blockSettings.writeNumber("Gear Level", blockSettings.readNumber("Gear Level") + 2)
                playerOneGear[0] = "Owned"
                blockSettings.writeStringArray("Gear", playerOneGear)
                console.log("gear upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile48`, function (sprite, location) {
    if (blockSettings.readImage("Skin").equals(img`
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        `)) {
        sprite.sayText("x2 Honey - 2500000 Honey", 100, false)
        if (controller.A.isPressed()) {
            if (blockSettings.readNumber("Honey") >= 2500000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 2500000)
                blockSettings.writeNumber("Multiplier", 2)
                blockSettings.writeImage("Skin", img`
                    . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
                    4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 5 4 4 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 4 5 5 4 5 5 4 
                    4 5 4 5 5 5 5 4 5 5 5 5 5 4 5 4 
                    4 5 5 4 5 5 4 5 5 5 5 5 5 4 5 4 
                    4 5 5 5 4 4 5 5 5 5 5 5 4 5 5 4 
                    4 5 5 5 4 4 5 5 5 5 5 4 5 5 5 4 
                    4 5 5 4 5 5 4 5 5 5 4 5 5 5 5 4 
                    4 5 4 5 5 5 5 4 5 4 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 4 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 4 4 4 4 4 5 4 
                    4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
                    4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
                    . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
                    `)
                mySprite.setImage(blockSettings.readImage("Skin"))
            }
        }
    } else {
        sprite.sayText("Owned", 100, false)
    }
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Spider, 2500, function (sprite) {
    if (Math.percentChance(75)) {
        spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(sprite, mySprite), 30)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`egg`, function (sprite, location) {
    sprite.sayText("One egg costs " + (playerOneBees.length * 456 + Math.round(playerOneBees.length / 2) * 5) + " honey.", 100, false)
    if (controller.A.isPressed()) {
        if (blockSettings.readNumber("Honey") >= playerOneBees.length * 456 + Math.round(playerOneBees.length / 2) * 5) {
            if (canOpen) {
                canOpen = false
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - (playerOneBees.length * 456 + Math.round(playerOneBees.length / 2) * 5))
                controller.moveSprite(sprite, 0, 0)
                declutter.load("Egg Hatching Background", sprites.create(img`
                    ffffffffffffffffffff
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    f111111111111111111f
                    ffffffffffffffffffff
                    `, SpriteKind.Screen))
                declutter.get("Egg Hatching Background").setPosition(mySprite.x, mySprite.y)
                declutter.get("Egg Hatching Background").changeScale(1, ScaleAnchor.Middle)
                declutter.load("EHA", sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . f f . . . . . . . 
                    . . . . . . 5 5 5 5 . . . . . . 
                    . . . . . 5 5 5 5 5 5 . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f f f f f f f f . . . . 
                    . . . . 5 5 5 5 5 5 5 5 . . . . 
                    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                    . . . f f f f f f f f f f . . . 
                    . . . f f f f f f f f f f . . . 
                    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                    . . . . 5 5 5 5 5 5 5 5 . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Screen))
                declutter.get("EHA").setPosition(mySprite.x, mySprite.y)
                declutter.get("EHA").changeScale(1, ScaleAnchor.Middle)
                animation.runImageAnimation(
                declutter.get("EHA"),
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . f f . . . . . . . 
                    . . . . . . 5 5 5 5 . . . . . . 
                    . . . . . 5 5 5 5 5 5 . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f f f f f f f f . . . . 
                    . . . . 5 5 5 5 5 5 5 5 . . . . 
                    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                    . . . f f f f f f f f f f . . . 
                    . . . f f f f f f f f f f . . . 
                    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                    . . . . 5 5 5 5 5 5 5 5 . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . f f . . . . . . . 
                    . . . . . . 5 5 5 5 . . . . . . 
                    . . . . . 5 5 5 5 5 5 . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f 1 f f f f 1 f . . . . 
                    . . . . 5 5 5 5 5 5 5 5 . . . . 
                    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                    . . . f f f f f f f f f f . . . 
                    . . . f f f f f f f f f f . . . 
                    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                    . . . . 5 1 5 5 5 5 5 5 . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . f f . . . . . . . 
                    . . . . . . 5 5 5 5 . . . . . . 
                    . . . . . 5 5 5 5 5 5 . . . . . 
                    . . . . . f 1 f f f f . . . . . 
                    . . . . f 1 f 1 f f 1 f . . . . 
                    . . . . 1 5 5 5 5 1 5 5 . . . . 
                    . . . 5 5 5 5 5 1 5 1 5 5 . . . 
                    . . . f f f f f f f f f f . . . 
                    . . . f f 1 f 1 f f f f f . . . 
                    . . . 5 1 5 1 5 5 5 5 5 5 . . . 
                    . . . . 5 1 5 1 5 5 5 5 . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . f f . . . . . . . 
                    . . . . . . 5 5 5 5 . . . . . . 
                    . . . . . 5 5 1 5 5 5 . . . . . 
                    . . . . . f 1 f 1 f f . . . . . 
                    . . . . f 1 f 1 f f 1 f . . . . 
                    . . . . 1 5 1 5 5 1 5 5 . . . . 
                    . . . 5 5 1 5 5 1 5 1 5 5 . . . 
                    . . . f 1 f f f f 1 f 1 f . . . 
                    . . . f f 1 f 1 f f f f f . . . 
                    . . . 5 1 5 1 5 5 5 5 5 5 . . . 
                    . . . . 5 1 5 1 5 5 5 5 . . . . 
                    . . . . . f 1 f 1 f f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . f f . . . . . . . 
                    . . . . . . 5 5 1 5 . . . . . . 
                    . . . . . 1 5 1 1 5 5 . . . . . 
                    . . . . . f 1 f 1 1 f . . . . . 
                    . . . . f 1 f 1 f f 1 f . . . . 
                    . . . . 1 5 1 1 1 1 5 1 . . . . 
                    . . . 1 5 1 5 5 1 5 1 5 1 . . . 
                    . . . f 1 f 1 f f 1 f 1 f . . . 
                    . . . 1 f 1 f 1 f f 1 f 1 . . . 
                    . . . 5 1 5 1 5 1 1 5 5 5 . . . 
                    . . . . 1 1 5 1 5 5 5 5 . . . . 
                    . . . . . f 1 f 1 f f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 1 f . . . . . . . 
                    . . . . . . 1 1 1 1 . . . . . . 
                    . . . . . 1 5 1 1 5 1 . . . . . 
                    . . . . . f 1 f 1 1 f . . . . . 
                    . . . . f 1 f 1 f f 1 f . . . . 
                    . . . . 1 5 1 1 1 1 5 1 . . . . 
                    . . . 1 1 1 1 5 1 5 1 5 1 . . . 
                    . . . f 1 f 1 f f 1 f 1 f . . . 
                    . . . 1 1 1 f 1 f f 1 f 1 . . . 
                    . . . 5 1 1 1 5 1 1 5 1 5 . . . 
                    . . . . 1 1 5 1 1 1 1 5 . . . . 
                    . . . . . f 1 f 1 f f . . . . . 
                    . . . . . . f 1 f 1 . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 1 f . . . . . . . 
                    . . . . . . 1 1 1 1 . . . . . . 
                    . . . . . 1 5 1 1 5 1 . . . . . 
                    . . . . . 1 1 f 1 1 1 . . . . . 
                    . . . . f 1 1 1 1 f 1 f . . . . 
                    . . . . 1 5 1 1 1 1 5 1 . . . . 
                    . . . 1 1 1 1 5 1 1 1 5 1 . . . 
                    . . . f 1 f 1 f 1 1 1 1 f . . . 
                    . . . 1 1 1 f 1 1 f 1 f 1 . . . 
                    . . . 5 1 1 1 1 1 1 1 1 5 . . . 
                    . . . . 1 1 5 1 1 1 1 5 . . . . 
                    . . . . . f 1 1 1 f 1 . . . . . 
                    . . . . . . f 1 f 1 . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 1 1 . . . . . . . 
                    . . . . . . 1 1 1 1 . . . . . . 
                    . . . . . 1 1 1 1 1 1 . . . . . 
                    . . . . . 1 1 1 1 1 1 . . . . . 
                    . . . . 1 1 1 1 1 1 1 1 . . . . 
                    . . . . 1 1 1 1 1 1 1 1 . . . . 
                    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    . . . . 1 1 1 1 1 1 1 1 . . . . 
                    . . . . . 1 1 1 1 1 1 . . . . . 
                    . . . . . . 1 1 1 1 . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `],
                500,
                false
                )
                timer.after(5000, function () {
                    if (Math.percentChance(50)) {
                        if (Math.percentChance(20)) {
                            spawn_bee(sprites.create(img`
                                . . . . b b . . . . 
                                . . . b b b b . . . 
                                . . . b b b b . . . 
                                . . . d d d d . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . d d d d . . . 
                                . . . f d d f . . . 
                                . . . d d d d . . . 
                                `, SpriteKind.Bee), "Boring Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . d d d d . . . 
                                . . . d d d d . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . d d d d . . . 
                                . . . b b b b . . . 
                                . . . b b b b . . . 
                                . . . . b b . . . . 
                                `], [img`
                                . . . . b b . . . . 
                                . . . b b b b . . . 
                                . . . b b b b . . . 
                                . . . d d d d . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . d d d d . . . 
                                . . . f d d f . . . 
                                . . . d d d d . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . b b d b d b d d . 
                                b b b d b d b d d . 
                                b b b d b d b d d . 
                                . b b d b d b d d . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . d d b d b d b b . 
                                . d d b d b d b b b 
                                . d d b d b d b b b 
                                . d d b d b d b b . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Uncommon", 25)
                            hatchedBee = "Boring Bee"
                            playerOneBees.push("Boring Bee")
                            achievements.create("You got a boring bee! UNCOMMON", 2, "", img`
                                . . . . b b . . . . 
                                . . . b b b b . . . 
                                . . . b b b b . . . 
                                . . . d d d d . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . d d d d . . . 
                                . . . f d d f . . . 
                                . . . d d d d . . . 
                                `)
                        } else if (Math.percentChance(20)) {
                            spawn_bee(sprites.create(img`
                                . . . . e e . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . d d d d . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . d d d d . . . 
                                . . . f d d f . . . 
                                . . . d d d d . . . 
                                `, SpriteKind.Bee), "Dirty Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . d d d d . . . 
                                . . . d d d d . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . d d d d . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . . e e . . . . 
                                `], [img`
                                . . . . e e . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . d d d d . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . d d d d . . . 
                                . . . f d d f . . . 
                                . . . d d d d . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . e e d e d e d d . 
                                e e e d e d e d d . 
                                e e e d e d e d d . 
                                . e e d e d e d d . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . d d e d e d e e . 
                                . d d e d e d e e e 
                                . d d e d e d e e e 
                                . d d e d e d e e . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Uncommon", 25)
                            hatchedBee = "Dirty Bee"
                            playerOneBees.push("Dirty Bee")
                            achievements.create("You got a dirty bee! UNCOMMON", 2, "", img`
                                . . . . e e . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . d d d d . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . d d d d . . . 
                                . . . f d d f . . . 
                                . . . d d d d . . . 
                                `)
                        } else if (Math.percentChance(15)) {
                            spawn_bee(sprites.create(img`
                                . . . . 6 6 . . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . f 7 7 f . . . 
                                . . . 7 7 7 7 . . . 
                                `, SpriteKind.Bee), "Grass Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 7 7 7 7 . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . . 6 6 . . . . 
                                `], [img`
                                . . . . 6 6 . . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . f 7 7 f . . . 
                                . . . 7 7 7 7 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 6 6 7 6 7 6 7 7 . 
                                6 6 6 7 6 7 6 7 7 . 
                                6 6 6 7 6 7 6 7 7 . 
                                . 6 6 7 6 7 6 7 7 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 7 7 6 7 6 7 6 6 . 
                                . 7 7 6 7 6 7 6 6 6 
                                . 7 7 6 7 6 7 6 6 6 
                                . 7 7 6 7 6 7 6 6 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Rare", 30)
                            hatchedBee = "Grass Bee"
                            playerOneBees.push("Grass Bee")
                            achievements.create("You got a grass bee! RARE", 2, "", img`
                                . . . . 6 6 . . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . f 7 7 f . . . 
                                . . . 7 7 7 7 . . . 
                                `)
                        } else if (Math.percentChance(15)) {
                            spawn_bee(sprites.create(img`
                                . . . . e e . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . f 7 7 f . . . 
                                . . . 7 7 7 7 . . . 
                                `, SpriteKind.Bee), "Tree Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 7 7 7 7 . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . . e e . . . . 
                                `], [img`
                                . . . . e e . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . f 7 7 f . . . 
                                . . . 7 7 7 7 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . e e 7 e 7 e 7 7 . 
                                e e e 7 e 7 e 7 7 . 
                                e e e 7 e 7 e 7 7 . 
                                . e e 7 e 7 e 7 7 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 7 7 e 7 e 7 e e . 
                                . 7 7 e 7 e 7 e e e 
                                . 7 7 e 7 e 7 e e e 
                                . 7 7 e 7 e 7 e e . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Rare", 30)
                            hatchedBee = "Tree Bee"
                            playerOneBees.push("Tree Bee")
                            achievements.create("You got a tree bee! RARE", 2, "", img`
                                . . . . e e . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . f 7 7 f . . . 
                                . . . 7 7 7 7 . . . 
                                `)
                        } else if (Math.percentChance(10)) {
                            spawn_bee(sprites.create(img`
                                . . . . 2 2 . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 4 4 4 4 . . . 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 4 4 4 4 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                . . . 4 4 4 4 . . . 
                                . . . f 4 4 f . . . 
                                . . . 4 4 4 4 . . . 
                                `, SpriteKind.Bee), "Blazing Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 4 4 4 4 . . . 
                                . . . 4 4 4 4 . . . 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 4 4 4 4 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                . . . 4 4 4 4 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . . 2 2 . . . . 
                                `], [img`
                                . . . . 2 2 . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 4 4 4 4 . . . 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 4 4 4 4 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                . . . 4 4 4 4 . . . 
                                . . . f 4 4 f . . . 
                                . . . 4 4 4 4 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 2 2 4 2 4 2 4 4 . 
                                2 2 2 4 2 4 2 4 4 . 
                                2 2 2 4 2 4 2 4 4 . 
                                . 2 2 4 2 4 2 4 4 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 4 4 2 4 2 4 2 2 . 
                                . 4 4 2 4 2 4 2 2 2 
                                . 4 4 2 4 2 4 2 2 2 
                                . 4 4 2 4 2 4 2 2 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Epic", 35)
                            hatchedBee = "Blazing Bee"
                            playerOneBees.push("Blazing Bee")
                            achievements.create("You got a blazing bee! EPIC", 2, "", img`
                                . . . . 2 2 . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 4 4 4 4 . . . 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 4 4 4 4 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                . . . 4 4 4 4 . . . 
                                . . . f 4 4 f . . . 
                                . . . 4 4 4 4 . . . 
                                `)
                        } else if (Math.percentChance(10)) {
                            spawn_bee(sprites.create(img`
                                . . . . 6 6 . . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 9 9 9 9 . . . 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 9 9 9 9 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                . . . 9 9 9 9 . . . 
                                . . . f 9 9 f . . . 
                                . . . 9 9 9 9 . . . 
                                `, SpriteKind.Bee), "Freezing Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 9 9 9 9 . . . 
                                . . . 9 9 9 9 . . . 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 9 9 9 9 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                . . . 9 9 9 9 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . . 6 6 . . . . 
                                `], [img`
                                . . . . 6 6 . . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 9 9 9 9 . . . 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 9 9 9 9 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                . . . 9 9 9 9 . . . 
                                . . . f 9 9 f . . . 
                                . . . 9 9 9 9 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 6 6 9 6 9 6 9 9 . 
                                6 6 6 9 6 9 6 9 9 . 
                                6 6 6 9 6 9 6 9 9 . 
                                . 6 6 9 6 9 6 9 9 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 9 9 6 9 6 9 6 6 . 
                                . 9 9 6 9 6 9 6 6 6 
                                . 9 9 6 9 6 9 6 6 6 
                                . 9 9 6 9 6 9 6 6 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Epic", 25)
                            hatchedBee = "Freezing Bee"
                            playerOneBees.push("Freezing Bee")
                            achievements.create("You got a freezing bee! EPIC", 2, "", img`
                                . . . . 6 6 . . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 9 9 9 9 . . . 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 9 9 9 9 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                . . . 9 9 9 9 . . . 
                                . . . f 9 9 f . . . 
                                . . . 9 9 9 9 . . . 
                                `)
                        } else if (Math.percentChance(5)) {
                            spawn_bee(sprites.create(img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . c a 5 b . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 c 8 2 b 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . b 4 7 b . . . 
                                . . . f c c f . . . 
                                . . . b c c c . . . 
                                `, SpriteKind.Bee), "Robot Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . b c c c . . . 
                                . . . b 4 7 b . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 c 8 2 b 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . c a 5 b . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . . f f . . . . 
                                `], [img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . c a 5 b . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 c 8 2 b 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . b 4 7 b . . . 
                                . . . f c c f . . . 
                                . . . b c c c . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . f f c f c f b b . 
                                f f f a f 8 f 4 c . 
                                f f f 5 f 2 f 7 c . 
                                . f f b f b f b c . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . b b f c f c f f . 
                                . c 4 f 8 f a f f f 
                                . c 7 f 2 f 5 f f f 
                                . c b f b f b f f . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Legendary", 35)
                            hatchedBee = "Robot Bee"
                            playerOneBees.push("Robot Bee")
                            achievements.create("You got a robot bee! LEGENDARY", 2, "", img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . c a 5 b . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 c 8 2 b 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . b 4 7 b . . . 
                                . . . f c c f . . . 
                                . . . b c c c . . . 
                                `)
                        } else if (Math.percentChance(5)) {
                            spawn_bee(sprites.create(img`
                                . . . . 2 2 . . . . 
                                . . . 2 4 4 2 . . . 
                                . . . 2 5 5 2 . . . 
                                . . . c c c c . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 c c c c 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . c c c c . . . 
                                . . . f c c f . . . 
                                . . . c c c c . . . 
                                `, SpriteKind.Bee), "Rocket Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . c c c c . . . 
                                . . . c c c c . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 c c c c 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . c c c c . . . 
                                . . . 2 5 5 2 . . . 
                                . . . 2 4 4 2 . . . 
                                . . . . 2 2 . . . . 
                                `], [img`
                                . . . . 2 2 . . . . 
                                . . . 2 4 4 2 . . . 
                                . . . 2 5 5 2 . . . 
                                . . . c c c c . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 c c c c 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . c c c c . . . 
                                . . . f c c f . . . 
                                . . . c c c c . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 2 2 c b c b c c . 
                                2 4 5 c b c b c c . 
                                2 4 5 c b c b c c . 
                                . 2 2 c b c b c c . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . c c b c b c 2 2 . 
                                . c c b c b c 5 4 2 
                                . c c b c b c 5 4 2 
                                . c c b c b c 2 2 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Legendary", 50)
                            hatchedBee = "Rocket Bee"
                            playerOneBees.push("Rocket Bee")
                            achievements.create("You got a rocket bee! LEGENDARY", 2, "", img`
                                . . . . 2 2 . . . . 
                                . . . 2 4 4 2 . . . 
                                . . . 2 5 5 2 . . . 
                                . . . c c c c . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 c c c c 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . c c c c . . . 
                                . . . f c c f . . . 
                                . . . c c c c . . . 
                                `)
                        } else if (Math.percentChance(1)) {
                            spawn_bee(sprites.create(img`
                                . . . . 2 2 . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 8 8 8 8 . . . 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 a a a a 9 9 9 
                                . . . 4 4 4 4 . . . 
                                . . . f 4 4 f . . . 
                                . . . 4 4 4 4 . . . 
                                `, SpriteKind.Bee), "Rainbow Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 4 4 4 4 . . . 
                                . . . 4 4 4 4 . . . 
                                9 9 9 a a a a 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                . . . 8 8 8 8 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . . 2 2 . . . . 
                                `], [img`
                                . . . . 2 2 . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 8 8 8 8 . . . 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 a a a a 9 9 9 
                                . . . 4 4 4 4 . . . 
                                . . . f 4 4 f . . . 
                                . . . 4 4 4 4 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 2 2 8 5 7 a 4 4 . 
                                2 2 2 8 5 7 a 4 4 . 
                                2 2 2 8 5 7 a 4 4 . 
                                . 2 2 8 5 7 a 4 4 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 4 4 a 7 5 8 2 2 . 
                                . 4 4 a 7 5 8 2 2 2 
                                . 4 4 a 7 5 8 2 2 2 
                                . 4 4 a 7 5 8 2 2 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Mythic", 30)
                            hatchedBee = "Rainbow Bee"
                            playerOneBees.push("Rainbow Bee")
                            achievements.create("You got a rainbow bee! MYTHIC", 2, "", img`
                                . . . . 2 2 . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 8 8 8 8 . . . 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 a a a a 9 9 9 
                                . . . 4 4 4 4 . . . 
                                . . . f 4 4 f . . . 
                                . . . 4 4 4 4 . . . 
                                `)
                        } else if (Math.percentChance(1)) {
                            spawn_bee(sprites.create(img`
                                . . . . 9 9 . . . . 
                                . . . 9 9 9 9 . . . 
                                . . . 9 9 9 9 . . . 
                                . . . 6 6 6 6 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 8 8 8 8 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 8 8 8 8 . . . 
                                . . . f 8 8 f . . . 
                                . . . 8 8 8 8 . . . 
                                `, SpriteKind.Bee), "Portal Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 8 8 8 8 . . . 
                                . . . 8 8 8 8 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 8 8 8 8 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 6 6 6 6 . . . 
                                . . . 9 9 9 9 . . . 
                                . . . 9 9 9 9 . . . 
                                . . . . 9 9 . . . . 
                                `], [img`
                                . . . . 9 9 . . . . 
                                . . . 9 9 9 9 . . . 
                                . . . 9 9 9 9 . . . 
                                . . . 6 6 6 6 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 8 8 8 8 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 8 8 8 8 . . . 
                                . . . f 8 8 f . . . 
                                . . . 8 8 8 8 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 9 9 6 f 8 f 8 8 . 
                                9 9 9 6 f 8 f 8 8 . 
                                9 9 9 6 f 8 f 8 8 . 
                                . 9 9 6 f 8 f 8 8 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 8 8 f 8 f 6 9 9 . 
                                . 8 8 f 8 f 6 9 9 9 
                                . 8 8 f 8 f 6 9 9 9 
                                . 8 8 f 8 f 6 9 9 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Mythic", 30)
                            hatchedBee = "Portal Bee"
                            playerOneBees.push("Portal Bee")
                            achievements.create("You got a portal bee! MYTHIC", 2, "", img`
                                . . . . 9 9 . . . . 
                                . . . 9 9 9 9 . . . 
                                . . . 9 9 9 9 . . . 
                                . . . 6 6 6 6 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 8 8 8 8 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 8 8 8 8 . . . 
                                . . . f 8 8 f . . . 
                                . . . 8 8 8 8 . . . 
                                `)
                        } else {
                            spawn_bee(sprites.create(img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f 5 5 f . . . 
                                . . . 5 5 5 5 . . . 
                                `, SpriteKind.Bee), "Average Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 5 5 5 5 . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . . f f . . . . 
                                `], [img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f 5 5 f . . . 
                                . . . 5 5 5 5 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . f f 5 f 5 f 5 5 . 
                                f f f 5 f 5 f 5 5 . 
                                f f f 5 f 5 f 5 5 . 
                                . f f 5 f 5 f 5 5 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 5 5 f 5 f 5 f f . 
                                . 5 5 f 5 f 5 f f f 
                                . 5 5 f 5 f 5 f f f 
                                . 5 5 f 5 f 5 f f . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Common", 25)
                            hatchedBee = "Average Bee"
                            playerOneBees.push("Average Bee")
                            achievements.create("You got an average bee! COMMON", 2, "", img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f 5 5 f . . . 
                                . . . 5 5 5 5 . . . 
                                `)
                        }
                    } else {
                        if (Math.percentChance(20)) {
                            spawn_bee(sprites.create(img`
                                . . . . d d . . . . 
                                . . . d d d d . . . 
                                . . . d d d d . . . 
                                . . . 1 1 1 1 . . . 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 1 1 1 1 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                . . . 1 1 1 1 . . . 
                                . . . f 1 1 f . . . 
                                . . . 1 1 1 1 . . . 
                                `, SpriteKind.Bee), "Paper Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 1 1 1 1 . . . 
                                . . . 1 1 1 1 . . . 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 1 1 1 1 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                . . . 1 1 1 1 . . . 
                                . . . d d d d . . . 
                                . . . d d d d . . . 
                                . . . . d d . . . . 
                                `], [img`
                                . . . . d d . . . . 
                                . . . d d d d . . . 
                                . . . d d d d . . . 
                                . . . 1 1 1 1 . . . 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 1 1 1 1 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                . . . 1 1 1 1 . . . 
                                . . . f 1 1 f . . . 
                                . . . 1 1 1 1 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . d d 1 d 1 d 1 1 . 
                                d d d 1 d 1 d 1 1 . 
                                d d d 1 d 1 d 1 1 . 
                                . d d 1 d 1 d 1 1 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 1 1 d 1 d 1 d d . 
                                . 1 1 d 1 d 1 d d d 
                                . 1 1 d 1 d 1 d d d 
                                . 1 1 d 1 d 1 d d . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Uncommon", 25)
                            hatchedBee = "Paper Bee"
                            playerOneBees.push("Paper Bee")
                            achievements.create("You got a paper bee! UNCOMMON", 2, "", img`
                                . . . . d d . . . . 
                                . . . d d d d . . . 
                                . . . d d d d . . . 
                                . . . 1 1 1 1 . . . 
                                9 9 9 d d d d 9 9 9 
                                9 9 9 1 1 1 1 9 9 9 
                                9 9 9 d d d d 9 9 9 
                                . . . 1 1 1 1 . . . 
                                . . . f 1 1 f . . . 
                                . . . 1 1 1 1 . . . 
                                `)
                        } else if (Math.percentChance(20)) {
                            spawn_bee(sprites.create(img`
                                . . . . e e . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . e e e e . . . 
                                . . . f e e f . . . 
                                . . . e e e e . . . 
                                `, SpriteKind.Bee), "Mud Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . . e e . . . . 
                                `], [img`
                                . . . . e e . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . e e e e . . . 
                                . . . f e e f . . . 
                                . . . e e e e . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . e e e e e e e e . 
                                e e e e e e e e e . 
                                e e e e e e e e e . 
                                . e e e e e e e e . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . e e e e e e e e . 
                                . e e e e e e e e e 
                                . e e e e e e e e e 
                                . e e e e e e e e . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Uncommon", 25)
                            hatchedBee = "Mud Bee"
                            playerOneBees.push("Mud Bee")
                            achievements.create("You got a mud bee! UNCOMMON", 2, "", img`
                                . . . . e e . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                . . . e e e e . . . 
                                . . . f e e f . . . 
                                . . . e e e e . . . 
                                `)
                        } else if (Math.percentChance(15)) {
                            spawn_bee(sprites.create(img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . b b b b . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . b b b b . . . 
                                . . . f b b f . . . 
                                . . . b b b b . . . 
                                `, SpriteKind.Bee), "Mechanic Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . b b b b . . . 
                                . . . b b b b . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . b b b b . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . . f f . . . . 
                                `], [img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . b b b b . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . b b b b . . . 
                                . . . f b b f . . . 
                                . . . b b b b . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . f f b f b f b b . 
                                f f f b f b f b b . 
                                f f f b f b f b b . 
                                . f f b f b f b b . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . b b f b f b f f . 
                                . b b f b f b f f f 
                                . b b f b f b f f f 
                                . b b f b f b f f . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Rare", 30)
                            hatchedBee = "Mechanic Bee"
                            playerOneBees.push("Mechanic Bee")
                            achievements.create("You got a mechanic bee! RARE", 2, "", img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . b b b b . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . b b b b . . . 
                                . . . f b b f . . . 
                                . . . b b b b . . . 
                                `)
                        } else if (Math.percentChance(15)) {
                            spawn_bee(sprites.create(img`
                                . . . . b b . . . . 
                                . . . b b b b . . . 
                                . . . b b b b . . . 
                                . . . c c c c . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 c c c c 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . c c c c . . . 
                                . . . f c c f . . . 
                                . . . c c c c . . . 
                                `, SpriteKind.Bee), "Iron Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . c c c c . . . 
                                . . . c c c c . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 c c c c 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . c c c c . . . 
                                . . . b b b b . . . 
                                . . . b b b b . . . 
                                . . . . b b . . . . 
                                `], [img`
                                . . . . b b . . . . 
                                . . . b b b b . . . 
                                . . . b b b b . . . 
                                . . . c c c c . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 c c c c 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . c c c c . . . 
                                . . . f c c f . . . 
                                . . . c c c c . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . b b c b c b c c . 
                                b b b c b c b c c . 
                                b b b c b c b c c . 
                                . b b c b c b c c . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . c c b c b c b b . 
                                . c c b c b c b b b 
                                . c c b c b c b b b 
                                . c c b c b c b b . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Rare", 25)
                            hatchedBee = "Iron Bee"
                            playerOneBees.push("Iron Bee")
                            achievements.create("You got an iron bee! RARE", 2, "", img`
                                . . . . b b . . . . 
                                . . . b b b b . . . 
                                . . . b b b b . . . 
                                . . . c c c c . . . 
                                9 9 9 b b b b 9 9 9 
                                9 9 9 c c c c 9 9 9 
                                9 9 9 b b b b 9 9 9 
                                . . . c c c c . . . 
                                . . . f c c f . . . 
                                . . . c c c c . . . 
                                `)
                        } else if (Math.percentChance(10)) {
                            spawn_bee(sprites.create(img`
                                . . . . 8 8 . . . . 
                                . . . 8 8 8 8 . . . 
                                . . . 8 8 8 8 . . . 
                                . . . 6 6 6 6 . . . 
                                9 9 9 8 8 8 8 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 8 8 8 8 9 9 9 
                                . . . 6 6 6 6 . . . 
                                . . . f 6 6 f . . . 
                                . . . 6 6 6 6 . . . 
                                `, SpriteKind.Bee), "Aquatic Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 6 6 6 6 . . . 
                                . . . 6 6 6 6 . . . 
                                9 9 9 8 8 8 8 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 8 8 8 8 9 9 9 
                                . . . 6 6 6 6 . . . 
                                . . . 8 8 8 8 . . . 
                                . . . 8 8 8 8 . . . 
                                . . . . 8 8 . . . . 
                                `], [img`
                                . . . . 8 8 . . . . 
                                . . . 8 8 8 8 . . . 
                                . . . 8 8 8 8 . . . 
                                . . . 6 6 6 6 . . . 
                                9 9 9 8 8 8 8 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 8 8 8 8 9 9 9 
                                . . . 6 6 6 6 . . . 
                                . . . f 6 6 f . . . 
                                . . . 6 6 6 6 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 8 8 6 8 6 8 6 6 . 
                                8 8 8 6 8 6 8 6 6 . 
                                8 8 8 6 8 6 8 6 6 . 
                                . 8 8 6 8 6 8 6 6 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 6 6 8 6 8 6 8 8 . 
                                . 6 6 8 6 8 6 8 8 8 
                                . 6 6 8 6 8 6 8 8 8 
                                . 6 6 8 6 8 6 8 8 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Epic", 30)
                            hatchedBee = "Aquatic Bee"
                            playerOneBees.push("Aquatic Bee")
                            achievements.create("You got an aquatic bee! EPIC", 2, "", img`
                                . . . . 8 8 . . . . 
                                . . . 8 8 8 8 . . . 
                                . . . 8 8 8 8 . . . 
                                . . . 6 6 6 6 . . . 
                                9 9 9 8 8 8 8 9 9 9 
                                9 9 9 6 6 6 6 9 9 9 
                                9 9 9 8 8 8 8 9 9 9 
                                . . . 6 6 6 6 . . . 
                                . . . f 6 6 f . . . 
                                . . . 6 6 6 6 . . . 
                                `)
                        } else if (Math.percentChance(10)) {
                            spawn_bee(sprites.create(img`
                                . . . . a a . . . . 
                                . . . a a a a . . . 
                                . . . a a a a . . . 
                                . . . 2 2 2 2 . . . 
                                9 9 9 a a a a 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 a a a a 9 9 9 
                                . . . 2 2 2 2 . . . 
                                . . . f 2 2 f . . . 
                                . . . 2 2 2 2 . . . 
                                `, SpriteKind.Bee), "Candy Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                9 9 9 a a a a 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 a a a a 9 9 9 
                                . . . 2 2 2 2 . . . 
                                . . . a a a a . . . 
                                . . . a a a a . . . 
                                . . . . a a . . . . 
                                `], [img`
                                . . . . a a . . . . 
                                . . . a a a a . . . 
                                . . . a a a a . . . 
                                . . . 2 2 2 2 . . . 
                                9 9 9 a a a a 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 a a a a 9 9 9 
                                . . . 2 2 2 2 . . . 
                                . . . f 2 2 f . . . 
                                . . . 2 2 2 2 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . a a 2 a 2 a 2 2 . 
                                a a a 2 a 2 a 2 2 . 
                                a a a 2 a 2 a 2 2 . 
                                . a a 2 a 2 a 2 2 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 2 2 a 2 a 2 a a . 
                                . 2 2 a 2 a 2 a a a 
                                . 2 2 a 2 a 2 a a a 
                                . 2 2 a 2 a 2 a a . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Epic", 25)
                            hatchedBee = "Candy Bee"
                            playerOneBees.push("Candy Bee")
                            achievements.create("You got a candy bee! EPIC", 2, "", img`
                                . . . . a a . . . . 
                                . . . a a a a . . . 
                                . . . a a a a . . . 
                                . . . 2 2 2 2 . . . 
                                9 9 9 a a a a 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 a a a a 9 9 9 
                                . . . 2 2 2 2 . . . 
                                . . . f 2 2 f . . . 
                                . . . 2 2 2 2 . . . 
                                `)
                        } else if (Math.percentChance(5)) {
                            spawn_bee(sprites.create(img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . e e 7 7 . . . 
                                9 9 9 f f e e 9 9 9 
                                9 9 9 7 7 f f 9 9 9 
                                9 9 9 e e 7 7 9 9 9 
                                . . . 7 7 e e . . . 
                                . . . f 7 e f . . . 
                                . . . e e 7 e . . . 
                                `, SpriteKind.Bee), "Commando Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . e 7 e 7 . . . 
                                . . . 7 7 e e . . . 
                                9 9 9 e e 7 7 9 9 9 
                                9 9 9 7 7 f f 9 9 9 
                                9 9 9 f f e e 9 9 9 
                                . . . e e 7 7 . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . . f f . . . . 
                                `], [img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . e e 7 7 . . . 
                                9 9 9 f f e e 9 9 9 
                                9 9 9 7 7 f f 9 9 9 
                                9 9 9 e e 7 7 9 9 9 
                                . . . 7 7 e e . . . 
                                . . . f 7 e f . . . 
                                . . . e e 7 e . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . f f e f 7 e 7 e . 
                                f f f e f 7 e 7 7 . 
                                f f f 7 e f 7 e e . 
                                . f f 7 e f 7 e 7 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . e 7 e 7 f e f f . 
                                . 7 7 e 7 f e f f f 
                                . e e 7 f e 7 f f f 
                                . 7 e 7 f e 7 f f . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Legendary", 35)
                            hatchedBee = "Commando Bee"
                            playerOneBees.push("Commando Bee")
                            achievements.create("You got a commando bee! LEGENDARY", 2, "", img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . e e 7 7 . . . 
                                9 9 9 f f e e 9 9 9 
                                9 9 9 7 7 f f 9 9 9 
                                9 9 9 e e 7 7 9 9 9 
                                . . . 7 7 e e . . . 
                                . . . f 7 e f . . . 
                                . . . e e 7 e . . . 
                                `)
                        } else if (Math.percentChance(5)) {
                            spawn_bee(sprites.create(img`
                                . . . . 1 1 . . . . 
                                . . . 1 1 1 1 . . . 
                                . . . 1 1 1 1 . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 1 1 1 1 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 1 1 1 1 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f 5 5 f . . . 
                                . . . 5 5 5 5 . . . 
                                `, SpriteKind.Bee), "Lightning Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 5 5 5 5 . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 1 1 1 1 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 1 1 1 1 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . 1 1 1 1 . . . 
                                . . . 1 1 1 1 . . . 
                                . . . . 1 1 . . . . 
                                `], [img`
                                . . . . 1 1 . . . . 
                                . . . 1 1 1 1 . . . 
                                . . . 1 1 1 1 . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 1 1 1 1 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 1 1 1 1 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f 5 5 f . . . 
                                . . . 5 5 5 5 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 1 1 5 1 5 1 5 5 . 
                                1 1 1 5 1 5 1 5 5 . 
                                1 1 1 5 1 5 1 5 5 . 
                                . 1 1 5 1 5 1 5 5 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 5 5 1 5 1 5 1 1 . 
                                . 5 5 1 5 1 5 1 1 1 
                                . 5 5 1 5 1 5 1 1 1 
                                . 5 5 1 5 1 5 1 1 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Legendary", 50)
                            hatchedBee = "Lightning Bee"
                            playerOneBees.push("Lightning Bee")
                            achievements.create("You got a lightning bee! LEGENDARY", 2, "", img`
                                . . . . 1 1 . . . . 
                                . . . 1 1 1 1 . . . 
                                . . . 1 1 1 1 . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 1 1 1 1 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 1 1 1 1 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f 5 5 f . . . 
                                . . . 5 5 5 5 . . . 
                                `)
                        } else if (Math.percentChance(1)) {
                            spawn_bee(sprites.create(img`
                                . . . . 2 2 . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . 2 7 7 2 . . . 
                                . . . 7 7 7 7 . . . 
                                `, SpriteKind.Bee), "Radioactive Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 7 7 7 7 . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . . 2 2 . . . . 
                                `], [img`
                                . . . . 2 2 . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . 2 7 7 2 . . . 
                                . . . 7 7 7 7 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 2 2 7 2 7 2 7 7 . 
                                2 2 2 7 2 7 2 7 7 . 
                                2 2 2 7 2 7 2 7 7 . 
                                . 2 2 7 2 7 2 7 7 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 7 7 2 7 2 7 2 2 . 
                                . 7 7 2 7 2 7 2 2 2 
                                . 7 7 2 7 2 7 2 2 2 
                                . 7 7 2 7 2 7 2 2 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Mythic", 30)
                            hatchedBee = "Radioactive Bee"
                            playerOneBees.push("Radioactive Bee")
                            achievements.create("You got a radioactive bee! MYTHIC", 2, "", img`
                                . . . . 2 2 . . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 2 2 2 2 . . . 
                                . . . 7 7 7 7 . . . 
                                9 9 9 2 2 2 2 9 9 9 
                                9 9 9 7 7 7 7 9 9 9 
                                9 9 9 2 2 2 2 9 9 9 
                                . . . 7 7 7 7 . . . 
                                . . . 2 7 7 2 . . . 
                                . . . 7 7 7 7 . . . 
                                `)
                        } else if (Math.percentChance(1)) {
                            spawn_bee(sprites.create(img`
                                . . . . 1 1 . . . . 
                                . . . 1 5 5 1 . . . 
                                . . . 1 5 5 1 . . . 
                                . . . e 1 1 e . . . 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                . . . e e e e . . . 
                                . . . f e e f . . . 
                                . . . e e e e . . . 
                                `, SpriteKind.Bee), "Flower Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . e e e e . . . 
                                . . . e e e e . . . 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                . . . e 1 1 e . . . 
                                . . . 1 5 5 1 . . . 
                                . . . 1 5 5 1 . . . 
                                . . . . 1 1 . . . . 
                                `], [img`
                                . . . . 1 1 . . . . 
                                . . . 1 5 5 1 . . . 
                                . . . 1 5 5 1 . . . 
                                . . . e 1 1 e . . . 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                . . . e e e e . . . 
                                . . . f e e f . . . 
                                . . . e e e e . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . 1 1 e 5 e 5 e e . 
                                1 5 5 1 5 e 5 e e . 
                                1 5 5 1 5 e 5 e e . 
                                . 1 1 e 5 e 5 e e . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . e e 5 e 5 e 1 1 . 
                                . e e 5 e 5 1 5 5 1 
                                . e e 5 e 5 1 5 5 1 
                                . e e 5 e 5 e 1 1 . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Mythic", 30)
                            hatchedBee = "Flower Bee"
                            playerOneBees.push("Flower Bee")
                            achievements.create("You got a flower bee! MYTHIC", 2, "", img`
                                . . . . 1 1 . . . . 
                                . . . 1 5 5 1 . . . 
                                . . . 1 5 5 1 . . . 
                                . . . e 1 1 e . . . 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 e e e e 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                . . . e e e e . . . 
                                . . . f e e f . . . 
                                . . . e e e e . . . 
                                `)
                        } else {
                            spawn_bee(sprites.create(img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f 5 5 f . . . 
                                . . . 5 5 5 5 . . . 
                                `, SpriteKind.Bee), "Average Bee", "Player One Bee", [img`
                                . . . . . . . . . . 
                                . . . 5 5 5 5 . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . . f f . . . . 
                                `], [img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f 5 5 f . . . 
                                . . . 5 5 5 5 . . . 
                                `], [img`
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . f f 5 f 5 f 5 5 . 
                                f f f 5 f 5 f 5 5 . 
                                f f f 5 f 5 f 5 5 . 
                                . f f 5 f 5 f 5 5 . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                . . . . 9 9 9 . . . 
                                `], [img`
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . 5 5 f 5 f 5 f f . 
                                . 5 5 f 5 f 5 f f f 
                                . 5 5 f 5 f 5 f f f 
                                . 5 5 f 5 f 5 f f . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                . . . 9 9 9 . . . . 
                                `], "Common", 25)
                            hatchedBee = "Average Bee"
                            playerOneBees.push("Average Bee")
                            achievements.create("You got an average bee! COMMON", 2, "", img`
                                . . . . f f . . . . 
                                . . . f f f f . . . 
                                . . . f f f f . . . 
                                . . . 5 5 5 5 . . . 
                                9 9 9 f f f f 9 9 9 
                                9 9 9 5 5 5 5 9 9 9 
                                9 9 9 f f f f 9 9 9 
                                . . . 5 5 5 5 . . . 
                                . . . f 5 5 f . . . 
                                . . . 5 5 5 5 . . . 
                                `)
                        }
                    }
                    timer.after(2500, function () {
                        declutter.offload("Egg Hatching Background")
                        declutter.offload("EHA")
                        blockSettings.writeStringArray("Bees", playerOneBees)
                        controller.moveSprite(mySprite, vx, vy)
                        canOpen = true
                        console.log("bee purchased")
                    })
                })
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile26`, function (sprite, location) {
    sprite.sayText(playerOneUpgrades[3], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneUpgrades[3] == "Octuple Storage - 24000 Honey") {
            if (blockSettings.readNumber("Honey") >= 24000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 24000)
                blockSettings.writeNumber("Max Storage", blockSettings.readNumber("Max Storage") * 8)
                statusbar.max = blockSettings.readNumber("Max Storage")
                statusbar.max += playerOneBees.length * 10 * number_of_bees(playerOneBees, "Robot Bee")
                playerOneUpgrades[3] = "Owned"
                blockSettings.writeStringArray("Storage Upgrades", playerOneUpgrades)
                console.log("storage upgraded")
            }
        }
    }
})
function spawn_bee (bee: Sprite, _type: string, player2: string, up: any[], down: any[], right: any[], left: any[], rarity: string, speed: number) {
    if (number_of_bees(playerOneBees, _type) == 0) {
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
        textSprite3 = textsprite.create("New bee discovered!!!", 15, 7)
        textSprite3.setPosition(mySprite.x, mySprite.y + 10)
        textSprite3.lifespan = 2500
        textSprite3.z = 100
        textSprite3.setFlag(SpriteFlag.RelativeToCamera, true)
    }
    if (_type == "Blazing Bee" || _type == "Rocket Bee") {
        bee.startEffect(effects.fire)
        if (_type == "Rocket Bee") {
            vx += 20
            vy += 20
            controller.moveSprite(mySprite, vx, vy)
            console.log("speed boost active")
        }
    } else if (_type == "Freezing Bee") {
        bee.startEffect(effects.blizzard)
    } else if (_type == "Tree Bee") {
        cooldown += -250
        console.log("flower refresh boost active")
    } else if (_type == "Portal Bee") {
        bee.startEffect(effects.coolRadial)
        bonus += 1
    } else if (_type == "Rainbow Bee") {
        bee.startEffect(effects.trail)
        cooldown += -500
    } else if (_type == "Robot Bee") {
        convertBonus += 4
        statusbar.max += playerOneBees.length * 10
    } else if (_type == "Mechanic Bee") {
        convertBonus += 4
    } else if (_type == "Iron Bee") {
        statusbar3.max += 50
        statusbar3.value = statusbar3.max
    } else if (_type == "Commando Bee") {
        attackPower += 1
        statusbar3.max += 50
        statusbar3.value = statusbar3.max
    } else if (_type == "Radioactive Bee") {
        bee.startEffect(effects.warmRadial)
    } else if (_type == "Flower Bee") {
        cooldown += -500
        bonus += 1
    } else if (_type == "Aquatic Bee") {
        bee.startEffect(effects.fountain)
    } else if (_type == "Ultraviolet Bee") {
        bonus += playerOneBees.length
    }
    bee.setFlag(SpriteFlag.GhostThroughWalls, true)
    sprites.setDataString(bee, "Type", _type)
    sprites.setDataString(bee, "Player", player2)
    sprites.setDataString(bee, "Rarity", rarity)
    sprites.setDataNumber(bee, "Speed", speed)
    bee.setPosition(mySprite.x, mySprite.y)
    characterAnimations.loopFrames(
    bee,
    up,
    500,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    bee,
    down,
    500,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    bee,
    right,
    500,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    bee,
    left,
    500,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    console.log("bee spawned")
}
scene.onOverlapTile(SpriteKind.Wave, assets.tile`myTile45`, function (sprite, location) {
    statusbar.value += 10
    tiles.setTileAt(location, assets.tile`myTile46`)
    timer.after(cooldown + 0, function () {
        tiles.setTileAt(location, assets.tile`myTile45`)
    })
})
sprites.onOverlap(SpriteKind.Bee, SpriteKind.Boss, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.BossHealth, otherSprite).value -= attackPower
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.BossHealth, otherSprite).value == 0) {
        sprites.destroy(otherSprite, effects.ashes, 2500)
        blockSettings.writeNumber("Spider", blockSettings.readNumber("Spider") + 1)
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
        game.setDialogFrame(img`
            f f f f f f f f f f f f f f f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f f f f f f f f f f f f f f f 
            `)
        game.showLongText("The Queen Spider has been defeated! You got a mini spider!", DialogLayout.Full)
        timer.after(2000, function () {
            game.reset()
        })
    }
})
scene.onOverlapTile(SpriteKind.Token, assets.tile`myTile45`, function (sprite, location) {
    if (sprites.readDataString(sprite, "Effect") == "Explosion" || sprites.readDataString(sprite, "Effect") == "Portal") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 5
            tiles.setTileAt(location, assets.tile`myTile46`)
            timer.after(cooldown + 0, function () {
                tiles.setTileAt(location, assets.tile`myTile45`)
            })
        }
    } else if (sprites.readDataString(sprite, "Effect") == "Nuke") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 5
            tiles.setTileAt(location, assets.tile`myTile46`)
            timer.after(cooldown + 1000, function () {
                tiles.setTileAt(location, assets.tile`myTile45`)
            })
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile62`, function (sprite, location) {
    currentTile = assets.tile`myTile62`
    if (controller.A.isPressed()) {
        tiles.setTileAt(location, assets.tile`myTile63`)
        statusbar.value += blockSettings.readNumber("Gear Level") + (playerOneBees.length + (bonus + 14))
        for (let value of playerOneBees) {
            if (value == "Grass Bee") {
                statusbar.value += 15
            }
            if (value == "Rainbow Bee") {
                statusbar.value += 15
            }
            if (value == "Flower Bee") {
                statusbar.value += 15
            }
        }
        timer.after(cooldown + 0, function () {
            tiles.setTileAt(location, assets.tile`myTile62`)
        })
    }
    honey_glob(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile41`, function (sprite, location) {
    sprite.sayText(playerOneGear[4], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneGear[4] == "+10 Collecting Efficiency - 16000 Honey") {
            if (blockSettings.readNumber("Honey") >= 16000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 16000)
                blockSettings.writeNumber("Gear Level", blockSettings.readNumber("Gear Level") + 10)
                playerOneGear[4] = "Owned"
                blockSettings.writeStringArray("Gear", playerOneGear)
                console.log("gear upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile19`, function (sprite, location) {
    sprite.sayText(playerOneUpgrades[0], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneUpgrades[0] == "Double Storage - 3000 Honey") {
            if (blockSettings.readNumber("Honey") >= 3000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 3000)
                blockSettings.writeNumber("Max Storage", blockSettings.readNumber("Max Storage") * 2)
                statusbar.max = blockSettings.readNumber("Max Storage")
                statusbar.max += playerOneBees.length * 10 * number_of_bees(playerOneBees, "Robot Bee")
                playerOneUpgrades[0] = "Owned"
                blockSettings.writeStringArray("Storage Upgrades", playerOneUpgrades)
                console.log("storage upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile68`, function (sprite, location) {
    sprite.sayText(playerOneGear[7], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneGear[7] == "+16 Collecting Efficiency - 640000 Honey") {
            if (blockSettings.readNumber("Honey") >= 640000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 640000)
                blockSettings.writeNumber("Gear Level", blockSettings.readNumber("Gear Level") + 16)
                playerOneGear[7] = "Owned"
                blockSettings.writeStringArray("Gear", playerOneGear)
                console.log("gear upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Token, assets.tile`myTile59`, function (sprite, location) {
    if (sprites.readDataString(sprite, "Effect") == "Explosion" || sprites.readDataString(sprite, "Effect") == "Portal") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 10
            tiles.setTileAt(location, assets.tile`myTile61`)
            timer.after(cooldown + 0, function () {
                tiles.setTileAt(location, assets.tile`myTile59`)
            })
        }
    } else if (sprites.readDataString(sprite, "Effect") == "Nuke") {
        if (sprites.readDataString(sprite, "Status") == "Active") {
            statusbar.value += 10
            tiles.setTileAt(location, assets.tile`myTile61`)
            timer.after(cooldown + 1000, function () {
                tiles.setTileAt(location, assets.tile`myTile59`)
            })
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Token, function (sprite, otherSprite) {
    if (sprites.readDataString(otherSprite, "Effect") == "Explosion" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        sprites.setDataString(otherSprite, "Status", "Active")
        otherSprite.setImage(img`
            ................7777777777777................
            .............777.............777.............
            ...........77...................77...........
            ..........7.......................7..........
            .........7.......77777777777.......7.........
            .......77.....777...........777.....77.......
            ......7......7.................7......7......
            ......7....77...................77....7......
            .....7....7......77777777777......7....7.....
            ....7....7.....77...........77.....7....7....
            ...7....7.....7...............7.....7....7...
            ...7....7....7.................7....7....7...
            ..7....7....7....777777777......7....7....7..
            ..7...7....7...77.........77.....7....7...7..
            ..7...7...7...7.............7.....7...7...7..
            .7....7...7..7.....7777777...7....7...7....7.
            .7...7...7...7....7.......7..7.....7...7...7.
            .7...7...7..7....7.........7..7....7...7...7.
            .7...7...7..7...7...77777...7.7....7...7...7.
            .7...7...7..7...7..7.....7..7.7....7...7...7.
            .7...7...7..7...7..7.....7..7.7....7...7...7.
            .7...7...7..7...7..7..7..7..7.7....7...7...7.
            .7...7...7..7...7..7.....7..7.7....7...7...7.
            .7...7...7..7...7..7.....7..7.7....7...7...7.
            .7...7...7..7...7...77777...7.7....7...7...7.
            .7...7...7..7....7.........7..7....7...7...7.
            .7...7...7...7....7.......7..7.....7...7...7.
            .7....7...7..7.....7777777...7....7...7....7.
            ..7...7...7...7.............7.....7...7...7..
            ..7...7....7...77.........77.....7....7...7..
            ..7....7....7....777777777......7....7....7..
            ...7....7....7.................7....7....7...
            ...7....7.....7...............7.....7....7...
            ....7....7.....77...........77.....7....7....
            .....7....7......77777777777......7....7.....
            ......7....77...................77....7......
            ......7......7.................7......7......
            .......77.....777...........777.....77.......
            .........7.......77777777777.......7.........
            ..........7.......................7..........
            ...........77...................77...........
            .............777.............777.............
            ................7777777777777................
            .............................................
            .............................................
            `)
        otherSprite.changeScale(1, ScaleAnchor.Middle)
        timer.after(400, function () {
            sprites.destroy(otherSprite, effects.warmRadial, 100)
            console.log("token activated")
        })
    } else if (sprites.readDataString(otherSprite, "Effect") == "Freeze" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
        sprites.setDataString(otherSprite, "Status", "Active")
        animation.runImageAnimation(
        otherSprite,
        [img`
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ..............................................9999999..............................................
            .............................................999199999.............................................
            ............................................99.......99............................................
            ...........................................99.........99...........................................
            ...........................................99.........99...........................................
            ...........................................99.........99...........................................
            ...........................................99.........99...........................................
            ...........................................99.........99...........................................
            ...........................................19.........99...........................................
            ...........................................99.........99...........................................
            ............................................99.......19............................................
            .............................................999999999.............................................
            ..............................................9999999..............................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            `,img`
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ..........................................99999999999999...........................................
            ..........................................99999999999999...........................................
            ........................................199999999119999999.........................................
            ........................................999999999119999999.........................................
            ......................................9999..............9999.......................................
            ......................................9999..............9999.......................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ....................................1999..................9991.....................................
            ....................................9999..................9991.....................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ....................................9999..................9999.....................................
            ......................................9991..............9999.......................................
            ......................................9999..............9991.......................................
            ........................................999999999999919999.........................................
            ........................................999999999999999999.........................................
            ..........................................99999999999999...........................................
            ..........................................99199999999999...........................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            `,img`
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            .......................................999999919999999999999.......................................
            .......................................999999999999999999999.......................................
            .......................................999999999999999999999.......................................
            ....................................911999999999999999999999919....................................
            ....................................999999999999999999999999999....................................
            ....................................999999999999999999991999999....................................
            .................................999999.....................999999.................................
            .................................999999.....................999999.................................
            .................................999199.....................999999.................................
            .............................9999999...........................999911..............................
            .............................9999999...........................999911..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................1999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999991...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9199999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................991999..............................
            .............................9999999...........................999999..............................
            .............................9999999...........................999999..............................
            .................................999999.....................999999.................................
            .................................999999.....................999999.................................
            .................................999991.....................999999.................................
            ....................................999999999999999999199999999....................................
            ....................................999999999999999999999999999....................................
            ....................................999999999999999999999999999....................................
            .......................................999999999999999999999.......................................
            .......................................999999999999999999999.......................................
            .......................................999999119999999999999.......................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            `,img`
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................9999999999999999999999999999999.................................
            ...................................9999999999999999999999999999999.................................
            ...................................9999999999999999999999999999999.................................
            ...................................9999999999999999999999999999999.................................
            ...................................9999999999999999999999999999999.................................
            ...............................9999999999999999999999999999999999999999............................
            ...............................1199999999999999999999999999999999999999............................
            ...............................1199999999999999999999999999999999999999............................
            ...............................9999999999999999999991199999999999999999............................
            ...............................9999999999999999999991199999999999999999............................
            ..........................999999999...............................999999999........................
            ..........................999999999...............................999999999........................
            ..........................999999999...............................999999999........................
            ..........................999999999...............................999999999........................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999119........................................99999999....................
            .......................99999119........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999911....................
            .......................99999999........................................99999911....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            .......................99999999........................................99999999....................
            ..........................999999999...............................999999999........................
            ..........................999999999...............................999999999........................
            ..........................999119999...............................999999999........................
            ..........................999119999...............................999999999........................
            ...............................9999999999999999999999999999999999999999............................
            ...............................9999999999999999999999999999999999999999............................
            ...............................9999999999999999999999999999999999999999............................
            ...............................9999999999999999999999999999999999999999............................
            ...............................9999999999999999999999999999991199999999............................
            ...................................9999999999999999999999999911999.................................
            ...................................9999999999999999999999999999999.................................
            ...................................9999999999999999999999999999999.................................
            ...................................9999999999999999999999999999999.................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            `,img`
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ................................99991119999999999999999999999999999999999..........................
            ................................99991119999999999999999999999999999999999..........................
            ................................99991119999999999999999999999999999999999..........................
            ................................99999999999999999999999999999999999999999..........................
            ................................99999999999999999999999999999999999999999..........................
            ................................99999999999999999999999999999999999999999..........................
            ................................99999999999999999999999999999999999999999..........................
            ...........................9999999999999999999999999999999999999999999999999999....................
            ...........................9999999999999999999999999999999999999999999999999999....................
            ...........................9999999999999999999999999999999999999999999999999999....................
            ...........................9999999999999999999999999999999999999999991119999999....................
            ...........................9999999999999999999999999999999999999999991119999999....................
            ...........................9999999999999999999999999999999999999999991119999999....................
            ....................999999999999.........................................99999999999...............
            ....................999999999999.........................................99999999999...............
            ....................999999999999.........................................99999999999...............
            ....................999999999999.........................................99999999999...............
            ....................999999999999.........................................99999999999...............
            ....................999999999999.........................................99999999999...............
            ................91119999999....................................................9999999999..........
            ................91119999999....................................................9999999999..........
            ................91119999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999111..........
            ................99999999999....................................................9999999111..........
            ................99999999999....................................................9999999111..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................11199999999....................................................9999999999..........
            ................11199999999....................................................9999999999..........
            ................11199999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................1119999999..........
            ................99999999111....................................................1119999999..........
            ................99999999111....................................................1119999999..........
            ................99999999111....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ................99999999999....................................................9999999999..........
            ....................999999999999.........................................99999999999...............
            ....................999999999999.........................................99999999999...............
            ....................999999999999.........................................99999999999...............
            ....................999999999999.........................................99999999999...............
            ....................999999999999.........................................99999999999...............
            ...........................9999999999999999999999999999999999999999999999999999....................
            ...........................9999999999999999999999999999999999999999999999999999....................
            ...........................9999999999999999999999999999999999999999999999999999....................
            ...........................9999999999999999999999999999999999999999991119999999....................
            ...........................9999999999999999999999999999999999999999991119999999....................
            ...........................9999999999999999999999999999999999999999991119999999....................
            ................................99999999999999999999999999999999999999999..........................
            ................................99999999999999999999999999999999999999999..........................
            ................................99111999999999999999999999999999999999999..........................
            ................................99111999999999999999999999999999999999999..........................
            ................................99111999999999999999999999999999999999999..........................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            ...................................................................................................
            `],
        100,
        false
        )
        otherSprite.setPosition(sprite.x - 25, sprite.y - 35)
        for (let value of spriteutils.getSpritesWithin(SpriteKind.Enemy, 100, sprite)) {
            sprites.setDataImageValue(value, "Image", value.image)
            sprites.setDataBoolean(value, "Follow", false)
            value.startEffect(effects.blizzard, 2500)
            value.follow(sprite, 0)
            value.image.replace(15, 9)
            value.image.replace(2, 9)
            value.image.replace(12, 9)
            value.image.replace(5, 9)
            value.image.replace(4, 9)
            value.image.replace(7, 9)
            value.image.replace(6, 9)
        }
        timer.after(500, function () {
            sprites.destroy(otherSprite, effects.blizzard, 100)
            console.log("token activated")
            timer.after(4500, function () {
                for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
                    sprites.setDataBoolean(value, "Follow", true)
                    value.setImage(sprites.readDataImage(value, "Image"))
                }
            })
        })
    } else if (sprites.readDataString(otherSprite, "Effect") == "Portal" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.InBackground)
        sprites.setDataString(otherSprite, "Status", "Active")
        otherSprite.lifespan += 30000
        otherSprite.setImage(img`
            .............................................
            .............................................
            .............................................
            .............................................
            .......................99999999..............
            ...................9999999999999999..........
            ................9999999999999999999999.......
            ..............999999999999...9999999999......
            .............999999999..........99999999.....
            .............999999................999999....
            ............99999....................99999...
            ...........99999......................9999...
            ..........99999.......................9999...
            .........999999........................9999..
            .........99999.........................9999..
            ........99999......99999999999999.......999..
            .......99999......999999999999999.......999..
            .......9999......99999999999999999......999..
            .......9999.....999999........99999.....999..
            .......999......99999..........9999.....999..
            .......999......9999............9999....999..
            .......999.....9999....99999....9999.........
            .......999.....9999....999999...9999.........
            .......999.....9999....9999999...999.........
            .......999.....999.....9999999...999.........
            .......999.....9999.......99999..999.........
            .......999.....9999........9999..999.........
            .......9999....99999.......9999..999.........
            .......9999.....9999999.9999999..999.........
            .......9999.....99999999999999...999.........
            ........9999.....9999999999999...999.........
            ........9999........999999......9999.........
            .........9999...................9999.........
            .........9999...................9999.........
            ..........9999.................9999..........
            ..........99999.............9999999..........
            ..........9999999......99999999999...........
            ...........9999999999999999999999............
            ............999999999999999999...............
            ..............99999999999....................
            .............................................
            .............................................
            .............................................
            .............................................
            .............................................
            `)
        animation.runImageAnimation(
        otherSprite,
        [img`
            .............................................
            .............................................
            .............................................
            .............................................
            .......................99999999..............
            ...................9999999999999999..........
            ................9999999999999999999999.......
            ..............999999999999...9999999999......
            .............999999999..........99999999.....
            .............999999................999999....
            ............99999....................99999...
            ...........99999......................9999...
            ..........99999.......................9999...
            .........999999........................9999..
            .........99999.........................9999..
            ........99999......99999999999999.......999..
            .......99999......999999999999999.......999..
            .......9999......99999999999999999......999..
            .......9999.....999999........99999.....999..
            .......999......99999..........9999.....999..
            .......999......9999............9999....999..
            .......999.....9999....99999....9999.........
            .......999.....9999....999999...9999.........
            .......999.....9999....9999999...999.........
            .......999.....999.....9999999...999.........
            .......999.....9999.......99999..999.........
            .......999.....9999........9999..999.........
            .......9999....99999.......9999..999.........
            .......9999.....9999999.9999999..999.........
            .......9999.....99999999999999...999.........
            ........9999.....9999999999999...999.........
            ........9999........999999......9999.........
            .........9999...................9999.........
            .........9999...................9999.........
            ..........9999.................9999..........
            ..........99999.............9999999..........
            ..........9999999......99999999999...........
            ...........9999999999999999999999............
            ............999999999999999999...............
            ..............99999999999....................
            .............................................
            .............................................
            .............................................
            .............................................
            .............................................
            `,img`
            .............................................
            .............................................
            .............99999999........................
            ..........99999999999........................
            .........999999999999........................
            ........9999999..............................
            .......999999................................
            ......99999..................................
            ......9999...................................
            ......9999..........99999999999999...........
            .....9999.........999999999999999999.........
            .....9999........99999999999999999999........
            .....9999......99999999........9999999.......
            .....999.......99999..............9999.......
            ....9999.......9999......9999......999.......
            ....9999.......999.....99999999....9999......
            ....999........999....999999999....9999......
            ....999........999...9999999999.....999......
            ....999........999...99999..999.....999......
            ....9999.......999...9999...9999....999......
            ....9999.......999...9999...9999....9999.....
            ....9999.......999...9999....999....9999.....
            .....999.......999..........9999.....999.....
            .....9999......9999.........9999.....999.....
            .....9999......99999........9999.....999.....
            .....9999......999999......9999......999.....
            ......9999......99999999.999999......999.....
            ......9999.......99999999999999......999.....
            ......99999.......999999999999......9999.....
            .......99999.........9999999........9999.....
            .......9999999.....................99999.....
            ........9999999...................99999......
            ..........999999................9999999......
            ...........999999.............99999999.......
            ............9999999........9999999999........
            .............999999999999999999999...........
            ...............99999999999999999.............
            ................99999999999999...............
            .............................................
            .............................................
            .............................................
            .............................................
            .............................................
            .............................................
            .............................................
            `,img`
            .............................................
            .............................................
            .............................................
            .............................................
            .............................................
            ....................99999999999..............
            ...............999999999999999999............
            ............9999999999999999999999...........
            ...........99999999999......9999999..........
            ..........9999999.............99999..........
            ..........9999.................9999..........
            .........9999...................9999.........
            .........9999...................9999.........
            .........9999......999999........9999........
            .........999...9999999999999.....9999........
            .........999...99999999999999.....9999.......
            .........999..9999999.9999999.....9999.......
            .........999..9999.......99999....9999.......
            .........999..9999........9999.....999.......
            .........999..99999.......9999.....999.......
            .........999...9999999.....999.....999.......
            .........999...9999999....9999.....999.......
            .........9999...999999....9999.....999.......
            .........9999....99999....9999.....999.......
            ..999....9999............9999......999.......
            ..999.....9999..........99999......999.......
            ..999.....99999........999999.....9999.......
            ..999......99999999999999999......9999.......
            ..999.......999999999999999......99999.......
            ..999.......99999999999999......99999........
            ..9999.........................99999.........
            ..9999........................999999.........
            ...9999.......................99999..........
            ...9999......................99999...........
            ...99999....................99999............
            ....999999................999999.............
            .....99999999..........999999999.............
            ......9999999999...999999999999..............
            .......9999999999999999999999................
            ..........9999999999999999...................
            ..............99999999.......................
            .............................................
            .............................................
            .............................................
            .............................................
            `,img`
            .............................................
            .............................................
            .............................................
            .............................................
            .............................................
            .............................................
            .............................................
            ...............99999999999999................
            .............99999999999999999...............
            ...........999999999999999999999.............
            ........9999999999........9999999............
            .......99999999.............999999...........
            ......9999999................999999..........
            ......99999...................9999999........
            .....99999.....................9999999.......
            .....9999........9999999.........99999.......
            .....9999......999999999999.......99999......
            .....999......99999999999999.......9999......
            .....999......999999.99999999......9999......
            .....999......9999......999999......9999.....
            .....999.....9999........99999......9999.....
            .....999.....9999.........9999......9999.....
            .....999.....9999..........999.......999.....
            .....9999....999....9999...999.......9999....
            .....9999....9999...9999...999.......9999....
            ......999....9999...9999...999.......9999....
            ......999.....999..99999...999........999....
            ......999.....9999999999...999........999....
            ......9999....999999999....999........999....
            ......9999....99999999.....999.......9999....
            .......999......9999......9999.......9999....
            .......9999..............99999.......999.....
            .......9999999........99999999......9999.....
            ........99999999999999999999........9999.....
            .........999999999999999999.........9999.....
            ...........99999999999999..........9999......
            ...................................9999......
            ..................................99999......
            ................................999999.......
            ..............................9999999........
            ........................999999999999.........
            ........................99999999999..........
            ........................99999999.............
            .............................................
            .............................................
            `],
        250,
        true
        )
        otherSprite.changeScale(1, ScaleAnchor.Middle)
        otherSprite.startEffect(effects.coolRadial)
    } else if (sprites.readDataString(otherSprite, "Effect") == "Rainbow" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
        sprites.destroy(otherSprite, effects.ashes, 100)
        effects.confetti.startScreenEffect(10000)
        bonus += Math.round(playerOneBees.length / 2)
        cooldown += -250
        for (let value of sprites.allOfKind(SpriteKind.Bee)) {
            if (sprites.readDataString(value, "Player") == "Player One Bee") {
                sprites.changeDataNumberBy(value, "Speed", 5)
            }
        }
        sprite.sayText("Pollen collection, flower growth, and bee speed boosted!", 2500, false)
        timer.after(10000, function () {
            bonus += Math.round(playerOneBees.length / 2) * -1
            cooldown += 250
            for (let value of sprites.allOfKind(SpriteKind.Bee)) {
                if (sprites.readDataString(value, "Player") == "Player One Bee") {
                    sprites.changeDataNumberBy(value, "Speed", -5)
                }
            }
        })
    } else if (sprites.readDataString(otherSprite, "Effect") == "Candy" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        sprites.destroy(otherSprite, effects.confetti, 100)
        blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") + playerOneBees.length * 10 * blockSettings.readNumber("Multiplier"))
        sprite.sayText("+" + playerOneBees.length * 10 * blockSettings.readNumber("Multiplier") + " honey!", 2500, false)
    } else if (sprites.readDataString(otherSprite, "Effect") == "Speed" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
        sprites.destroy(otherSprite, effects.halo, 100)
        vx += 40
        vy += 40
        controller.moveSprite(sprite, vx, vy)
        sprite.startEffect(effects.halo, 10000)
        console.log("super speed boost active")
        timer.after(10000, function () {
            vx += -40
            vy += -40
            controller.moveSprite(sprite, vx, vy)
            console.log("super speed boost inactive")
        })
    } else if (sprites.readDataString(otherSprite, "Effect") == "Nuke" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
        bonus += 1
        sprites.setDataString(otherSprite, "Status", "Active")
        otherSprite.setImage(img`
            ................7777777777777................
            .............777.............777.............
            ...........77...................77...........
            ..........7.......................7..........
            .........7.......77777777777.......7.........
            .......77.....777...........777.....77.......
            ......7......7.................7......7......
            ......7....77...................77....7......
            .....7....7......77777777777......7....7.....
            ....7....7.....77...........77.....7....7....
            ...7....7.....7...............7.....7....7...
            ...7....7....7.................7....7....7...
            ..7....7....7....777777777......7....7....7..
            ..7...7....7...77.........77.....7....7...7..
            ..7...7...7...7.............7.....7...7...7..
            .7....7...7..7.....7777777...7....7...7....7.
            .7...7...7...7....7.......7..7.....7...7...7.
            .7...7...7..7....7.........7..7....7...7...7.
            .7...7...7..7...7...77777...7.7....7...7...7.
            .7...7...7..7...7..7.....7..7.7....7...7...7.
            .7...7...7..7...7..7.....7..7.7....7...7...7.
            .7...7...7..7...7..7..7..7..7.7....7...7...7.
            .7...7...7..7...7..7.....7..7.7....7...7...7.
            .7...7...7..7...7..7.....7..7.7....7...7...7.
            .7...7...7..7...7...77777...7.7....7...7...7.
            .7...7...7..7....7.........7..7....7...7...7.
            .7...7...7...7....7.......7..7.....7...7...7.
            .7....7...7..7.....7777777...7....7...7....7.
            ..7...7...7...7.............7.....7...7...7..
            ..7...7....7...77.........77.....7....7...7..
            ..7....7....7....777777777......7....7....7..
            ...7....7....7.................7....7....7...
            ...7....7.....7...............7.....7....7...
            ....7....7.....77...........77.....7....7....
            .....7....7......77777777777......7....7.....
            ......7....77...................77....7......
            ......7......7.................7......7......
            .......77.....777...........777.....77.......
            .........7.......77777777777.......7.........
            ..........7.......................7..........
            ...........77...................77...........
            .............777.............777.............
            ................7777777777777................
            .............................................
            .............................................
            `)
        otherSprite.changeScale(3, ScaleAnchor.Middle)
        otherSprite.lifespan += 2500
        timer.after(2500, function () {
            sprites.destroy(otherSprite, effects.warmRadial, 100)
            console.log("token activated")
            timer.after(12500, function () {
                bonus += -1
            })
        })
    } else if (sprites.readDataString(otherSprite, "Effect") == "Convert" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        sprites.destroy(otherSprite)
        blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") + (statusbar.value * blockSettings.readNumber("Multiplier") + Math.round(statusbar.value / 2)))
        statusbar.value = 0
        sprite.sayText("Converted all pollen +50% to honey!", 2500, false)
    } else if (sprites.readDataString(otherSprite, "Effect") == "Automatic Convert" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        if (!(autoConvert)) {
            sprites.destroy(otherSprite)
            color.startFade(color.originalPalette, color.GrayScale, 2000)
            autoConvert = true
            sprite.sayText("Automatic pollen conversion!", 2500, false)
            timer.after(12000, function () {
                color.startFade(color.GrayScale, color.originalPalette, 2000)
                timer.after(2000, function () {
                    autoConvert = false
                })
            })
        }
    } else if (sprites.readDataString(otherSprite, "Effect") == "Pollen Boost" && sprites.readDataString(otherSprite, "Status") == "Inactive") {
        sprites.destroy(otherSprite)
        bonus += playerOneBees.length
        sprite.sayText("+" + playerOneBees.length + " pollen collection!", 2500, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile53`, function (sprite, location) {
    if (number_of_bees(playerOneBees, "Ultraviolet Bee") == 0) {
        sprite.sayText("Claim a free ultraviolet bee! (Press B)", 100, false)
        if (controller.B.isPressed()) {
            spawn_bee(sprites.create(img`
                . . . . 8 8 . . . . 
                . . . 8 8 8 8 . . . 
                . . . 8 8 8 8 . . . 
                . . . a a a a . . . 
                9 9 9 8 8 8 8 9 9 9 
                9 9 9 a a a a 9 9 9 
                9 9 9 8 8 8 8 9 9 9 
                . . . a a a a . . . 
                . . . 8 a a 8 . . . 
                . . . a a a a . . . 
                `, SpriteKind.Bee), "Ultraviolet Bee", "Player One Bee", [img`
                . . . . . . . . . . 
                . . . a a a a . . . 
                . . . a a a a . . . 
                9 9 9 8 8 8 8 9 9 9 
                9 9 9 a a a a 9 9 9 
                9 9 9 8 8 8 8 9 9 9 
                . . . a a a a . . . 
                . . . 8 8 8 8 . . . 
                . . . 8 8 8 8 . . . 
                . . . . 8 8 . . . . 
                `], [img`
                . . . . 8 8 . . . . 
                . . . 8 8 8 8 . . . 
                . . . 8 8 8 8 . . . 
                . . . a a a a . . . 
                9 9 9 8 8 8 8 9 9 9 
                9 9 9 a a a a 9 9 9 
                9 9 9 8 8 8 8 9 9 9 
                . . . a a a a . . . 
                . . . 8 a a 8 . . . 
                . . . a a a a . . . 
                `], [img`
                . . . . 9 9 9 . . . 
                . . . . 9 9 9 . . . 
                . . . . 9 9 9 . . . 
                . 8 8 a 8 a 8 a a . 
                8 8 8 a 8 a 8 a a . 
                8 8 8 a 8 a 8 a a . 
                . 8 8 a 8 a 8 a a . 
                . . . . 9 9 9 . . . 
                . . . . 9 9 9 . . . 
                . . . . 9 9 9 . . . 
                `], [img`
                . . . 9 9 9 . . . . 
                . . . 9 9 9 . . . . 
                . . . 9 9 9 . . . . 
                . a a 8 a 8 a 8 8 . 
                . a a 8 a 8 a 8 8 8 
                . a a 8 a 8 a 8 8 8 
                . a a 8 a 8 a 8 8 . 
                . . . 9 9 9 . . . . 
                . . . 9 9 9 . . . . 
                . . . 9 9 9 . . . . 
                `], "Special", 35)
            hatchedBee = "Ultraviolet Bee"
            playerOneBees.push("Ultraviolet Bee")
            achievements.create("You got an ultraviolet bee! SPECIAL", 2, "", img`
                . . . . 8 8 . . . . 
                . . . 8 8 8 8 . . . 
                . . . 8 8 8 8 . . . 
                . . . a a a a . . . 
                9 9 9 8 8 8 8 9 9 9 
                9 9 9 a a a a 9 9 9 
                9 9 9 8 8 8 8 9 9 9 
                . . . a a a a . . . 
                . . . 8 a a 8 . . . 
                . . . a a a a . . . 
                `)
            blockSettings.writeStringArray("Bees", playerOneBees)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile59`, function (sprite, location) {
    currentTile = assets.tile`myTile59`
    if (controller.A.isPressed()) {
        tiles.setTileAt(location, assets.tile`myTile61`)
        statusbar.value += blockSettings.readNumber("Gear Level") + (playerOneBees.length + (bonus + 9))
        for (let value of playerOneBees) {
            if (value == "Grass Bee") {
                statusbar.value += 10
            }
            if (value == "Rainbow Bee") {
                statusbar.value += 10
            }
            if (value == "Flower Bee") {
                statusbar.value += 10
            }
        }
        timer.after(cooldown + 0, function () {
            tiles.setTileAt(location, assets.tile`myTile59`)
        })
    }
    honey_glob(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row)
})
scene.onHitWall(SpriteKind.Wave, function (sprite, location) {
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Wave, assets.tile`myTile32`, function (sprite, location) {
    statusbar.value += 8
    tiles.setTileAt(location, assets.tile`myTile33`)
    timer.after(cooldown + 0, function () {
        tiles.setTileAt(location, assets.tile`myTile32`)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile69`, function (sprite, location) {
    sprite.sayText(playerOneUpgrades[7], 100, false)
    if (controller.A.isPressed()) {
        if (playerOneUpgrades[7] == "Sexdecuple Storage - 15000000 Honey") {
            if (blockSettings.readNumber("Honey") >= 15000000) {
                blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") - 15000000)
                blockSettings.writeNumber("Max Storage", blockSettings.readNumber("Max Storage") * 16)
                statusbar.max = blockSettings.readNumber("Max Storage")
                statusbar.max += playerOneBees.length * 10 * number_of_bees(playerOneBees, "Robot Bee")
                playerOneUpgrades[7] = "Owned"
                blockSettings.writeStringArray("Storage Upgrades", playerOneUpgrades)
                console.log("storage upgraded")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile32`, function (sprite, location) {
    currentTile = assets.tile`myTile32`
    if (controller.A.isPressed()) {
        tiles.setTileAt(location, assets.tile`myTile33`)
        statusbar.value += blockSettings.readNumber("Gear Level") + (playerOneBees.length + (bonus + 3))
        for (let value of playerOneBees) {
            if (value == "Grass Bee") {
                statusbar.value += 4
            }
            if (value == "Rainbow Bee") {
                statusbar.value += 4
            }
            if (value == "Flower Bee") {
                statusbar.value += 4
            }
        }
        timer.after(cooldown + 0, function () {
            tiles.setTileAt(location, assets.tile`myTile32`)
        })
    }
    honey_glob(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row)
})
let statusbar2: StatusBarSprite = null
let mySprite4: Sprite = null
let autoConvert = true 
let textSprite3: TextSprite = null
let web: Sprite = null
let currentTile: Image = null
let respawnTile: tiles.Location = null
let projectile: Sprite = null
let myToken: Sprite = null
let hatchedBee = ""
let myMenu: miniMenu.MenuSprite = null
let beesToMorph: miniMenu.MenuItem[] = []
let canMorph = false
let statusbar4: StatusBarSprite = null
let mySprite2: Sprite = null
let instances = 0
let honeyGlob: Sprite = null
let honeyToken: Sprite = null
let morphFruitToken: Sprite = null
let mySpider: Sprite = null
let statusbar3: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let playerOneUpgrades: string[] = []
let playerOneGear: string[] = []
let playerOneBees: string[] = []
let vy = 0
let vx = 0
let bubbleTransport = true
let mySprite: Sprite = null
let mySprite3: Sprite = null
let boss = false
let morph = false
let honeyStorm = false
let canOpen = false
let instantPollenConversion = true
let attackPower = 900000000000000000000000
let convertBonus = 9000000000000000000000
let cooldown = 0
let bonus = 0
let players = 1
bonus = 90000000000000000000000000
cooldown = 0
convertBonus = 9000000000000000000000000
attackPower = 9000000000000000000000000000
canOpen = true
honeyStorm = false
morph = true
boss = false
tiles.setCurrentTilemap(tilemap`level1`)
for (let value of tiles.getTilesByType(assets.tile`myTile22`)) {
    mySprite3 = sprites.create(img`
        ......cc66......
        .....c6576c.....
        ....c677576c....
        ....cc677666....
        ...cc6c6667cc...
        ..6c666777cc6c..
        ..c76666766776..
        ..c6777777776c..
        ..cc67777776cc..
        .c67cc76676676c.
        .c777666667777c.
        .c6777777777766.
        .cc7767776776666
        c676cc6766666776
        c777766666677776
        cc7777777777776c
        .c676777677767c.
        ..cc667666766c..
        ...ccc6c66ccc...
        .....cccccc.....
        .......ee.......
        ......eeee......
        .....eeeeee.....
        .......ee.......
        `, SpriteKind.Tree)
    tiles.placeOnTile(mySprite3, value)
    mySprite3.changeScale(2, ScaleAnchor.Middle)
    mySprite3.z = 50
}
for (let value of tiles.getTilesByType(assets.tile`myTile21`)) {
    mySprite3 = sprites.create(img`
        ......cc66......
        .....c6576c.....
        ....c677576c....
        ....cc677666....
        ...cc6c6667cc...
        ..6c666777cc6c..
        ..c76666766776..
        ..c6777777776c..
        ..cc67777776cc..
        .c67cc76676676c.
        .c777666667777c.
        .c6777777777766.
        .cc7767776776666
        c676cc6766666776
        c777766666677776
        cc7777777777776c
        .c676777677767c.
        ..cc667666766c..
        ...ccc6c66ccc...
        .....cccccc.....
        .......ee.......
        ......eeee......
        .....eeeeee.....
        .......ee.......
        `, SpriteKind.Tree)
    tiles.placeOnTile(mySprite3, value)
    mySprite3.changeScale(2, ScaleAnchor.Middle)
    mySprite3.z = 50
}
for (let value of tiles.getTilesByType(assets.tile`myTile47`)) {
    mySprite3 = sprites.create(img`
        ......cc66......
        .....c6576c.....
        ....c677576c....
        ....cc677666....
        ...cc6c6667cc...
        ..6c666777cc6c..
        ..c76666766776..
        ..c6777777776c..
        ..cc67777776cc..
        .c67cc76676676c.
        .c777666667777c.
        .c6777777777766.
        .cc7767776776666
        c676cc6766666776
        c777766666677776
        cc7777777777776c
        .c676777677767c.
        ..cc667666766c..
        ...ccc6c66ccc...
        .....cccccc.....
        .......ee.......
        ......eeee......
        .....eeeeee.....
        .......ee.......
        `, SpriteKind.Tree)
    tiles.placeOnTile(mySprite3, value)
    mySprite3.changeScale(2, ScaleAnchor.Middle)
    mySprite3.z = 50
}
for (let value of tiles.getTilesByType(assets.tile`myTile34`)) {
    mySprite3 = sprites.create(img`
        . . . . . . . . . b b b b . . . 
        . . . . . . b b b d d d d b . . 
        . . . . . . b d d d d d d b . . 
        . . . . b b d d d d d b b d . . 
        . . . . b d d d d d d b b d b . 
        . . . . c d d d d d b b d b c . 
        . . . b c c b b b b d d b c c . 
        . . b b c c c b d d b c c c c . 
        . b b d d d b b b b b b c c c c 
        . c d d d d d d b d b c c c b c 
        . c b d d d b b d b c c c b b c 
        c b c c c c b d d b b b b b c c 
        c c b b b d d b c c b b b b c c 
        c c c c c c c c c b b b b c c . 
        . c c c c b b b b b b b c c . . 
        . . . . c c c c c c c c . . . . 
        `, SpriteKind.Tree)
    tiles.placeOnTile(mySprite3, value)
    mySprite3.changeScale(2, ScaleAnchor.Middle)
    mySprite3.z = 50
}
mySprite = sprites.create(img`
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    `, SpriteKind.Player)
vx = 65
vy = 65
controller.moveSprite(mySprite, vx, vy)
tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
scene.cameraFollowSprite(mySprite)
if (!(blockSettings.exists("Bees"))) {
    blockSettings.writeStringArray("Bees", ["Average Bee"])
}
playerOneBees = blockSettings.readStringArray("Bees")
if (!(blockSettings.exists("Gear"))) {
    blockSettings.writeStringArray("Gear", [
    "+2 Collecting Efficiency - 1000 Honey",
    "+4 Collecting Efficiency - 2000 Honey",
    "+6 Collecting Efficiency - 4000 Honey",
    "+8 Collecting Efficiency - 8000 Honey",
    "+10 Collecting Efficiency - 16000 Honey",
    "+12 Collecting Efficiency - 32000 Honey",
    "+14 Collecting Efficiency - 320000 Honey",
    "+16 Collecting Efficiency - 640000 Honey"
    ])
}
playerOneGear = blockSettings.readStringArray("Gear")
if (!(blockSettings.exists("Storage Upgrades"))) {
    blockSettings.writeStringArray("Storage Upgrades", [
    "Double Storage - 3000 Honey",
    "Quadruple Storage - 6000 Honey",
    "Sextuple Storage - 12000 Honey",
    "Octuple Storage - 24000 Honey",
    "Decuple Storage - 120000 Honey",
    "Duodecuple Storage - 600000 Honey",
    "Quattuordecuple Storage - 3000000 Honey",
    "Sexdecuple Storage - 15000000 Honey"
    ])
}
playerOneUpgrades = blockSettings.readStringArray("Storage Upgrades")
if (!(blockSettings.exists("Honey"))) {
    blockSettings.writeNumber("Honey", 0)
}
if (!(blockSettings.exists("Morph Fruits"))) {
    blockSettings.writeNumber("Morph Fruits", 0)
}
if (!(blockSettings.exists("Max Storage"))) {
    blockSettings.writeNumber("Max Storage", 100)
}
if (!(blockSettings.exists("Gear Level"))) {
    blockSettings.writeNumber("Gear Level", 1)
}
if (!(blockSettings.exists("Honey Storm Cooldown"))) {
    blockSettings.writeNumber("Honey Storm Cooldown", 0)
}
if (!(blockSettings.exists("Multiplier"))) {
    blockSettings.writeNumber("Multiplier", 1)
}
if (!(blockSettings.exists("Spider"))) {
    blockSettings.writeNumber("Spider", 0)
}
if (!(blockSettings.exists("Skin"))) {
    blockSettings.writeImage("Skin", img`
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        `)
}
mySprite.setImage(blockSettings.readImage("Skin"))
if (!(blockSettings.exists("Ghost"))) {
    blockSettings.writeBoolean("Ghost", false)
}
mySprite.setFlag(SpriteFlag.GhostThroughWalls, blockSettings.readBoolean("Ghost"))
statusbar = statusbars.create(125, 8, StatusBarKind.Pollen)
statusbar.max = blockSettings.readNumber("Max Storage")
statusbar.value = 0
statusbar.setColor(5, 6)
statusbar.attachToSprite(mySprite, -64, 0)
statusbar.z = statusbar.z + 1
statusbar3 = statusbars.create(160, 5, StatusBarKind.Energy)
statusbar3.max = 1000
statusbar3.value = 1000
statusbar3.setColor(6, 2)
statusbar3.attachToSprite(mySprite, 50, 0)
statusbar3.z = statusbar3.z + 1
let textSprite = textsprite.create("Honey", 4, 1)
textSprite.setPosition(mySprite.x, mySprite.y - 51)
textSprite.z = 1000
sprites.setDataNumber(textSprite, "Y Offset", -51)
let textSprite2 = textsprite.create("Pollen", 0, 1)
textSprite2.setPosition(mySprite.x, mySprite.y + 52)
textSprite2.z = 1000
sprites.setDataNumber(textSprite2, "Y Offset", 52)
for (let index = 0; index < blockSettings.readNumber("Spider"); index++) {
    mySpider = sprites.create(img`
        . . . . . f f f f f . . . . . 
        . . . . f f f f f f f . . . . 
        . . . f f f f 2 f f f f . . . 
        . . . f f f 2 2 2 f f f . . . 
        . . . f f f f 2 f f f f . . . 
        . . . f f f 2 2 2 f f f . . . 
        . . . . f f f 2 f f f . . . . 
        . . . . . f f f f f . . . . . 
        . . . . . . f f f . . . . . . 
        . f f . . f f f f f . . f f . 
        f . . f f f f f f f f f . . f 
        . . . . . f f f f f . . . . . 
        . . f f f 2 f f f 2 f f f . . 
        . f . . . f 2 f 2 f . . . f . 
        f . . . . . f f f . . . . . f 
        `, SpriteKind.Spider)
    characterAnimations.loopFrames(
    mySpider,
    [img`
        . . . . . f f f f f . . . . . 
        . . . . f f f f f f f . . . . 
        . . . f f f f 2 f f f f . . . 
        . . . f f f 2 2 2 f f f . . . 
        . . . f f f f 2 f f f f . . . 
        . . . f f f 2 2 2 f f f . . . 
        . . . . f f f 2 f f f . . . . 
        . . . . . f f f f f . . . . . 
        . . . . . . f f f . . . . . . 
        . f f . . f f f f f . . f f . 
        f . . f f f f f f f f f . . f 
        . . . . . f f f f f . . . . . 
        . . f f f 2 f f f 2 f f f . . 
        . f . . . f 2 f 2 f . . . f . 
        f . . . . . f f f . . . . . f 
        `],
    500,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    mySpider,
    [img`
        f . . . . . f f f . . . . . f 
        . f . . . f 2 f 2 f . . . f . 
        . . f f f 2 f f f 2 f f f . . 
        . . . . . f f f f f . . . . . 
        f . . f f f f f f f f f . . f 
        . f f . . f f f f f . . f f . 
        . . . . . . f f f . . . . . . 
        . . . . . f f f f f . . . . . 
        . . . . f f f 2 f f f . . . . 
        . . . f f f 2 2 2 f f f . . . 
        . . . f f f f 2 f f f f . . . 
        . . . f f f 2 2 2 f f f . . . 
        . . . f f f f 2 f f f f . . . 
        . . . . f f f f f f f . . . . 
        . . . . . f f f f f . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    mySpider,
    [img`
        f . . . f . . . . . . . . . . 
        . f . . . f . . . . . . . . . 
        . . f . . f . . . . . . . . . 
        . . f . f . . . . f f f f . . 
        . . f . f . . . f f f f f f . 
        . f 2 f f f . f f f f f f f f 
        f 2 f f f f f f f 2 f 2 f f f 
        f f f f f f f f 2 2 2 2 2 f f 
        f 2 f f f f f f f 2 f 2 f f f 
        . f 2 f f f . f f f f f f f f 
        . . f . f . . . f f f f f f . 
        . . f . f . . . . f f f f . . 
        . . f . . f . . . . . . . . . 
        . f . . . f . . . . . . . . . 
        f . . . f . . . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    mySpider,
    [img`
        . . . . . . . . . . f . . . f 
        . . . . . . . . . f . . . f . 
        . . . . . . . . . f . . f . . 
        . . f f f f . . . . f . f . . 
        . f f f f f f . . . f . f . . 
        f f f f f f f f . f f f 2 f . 
        f f f 2 f 2 f f f f f f f 2 f 
        f f 2 2 2 2 2 f f f f f f f f 
        f f f 2 f 2 f f f f f f f 2 f 
        f f f f f f f f . f f f 2 f . 
        . f f f f f f . . . f . f . . 
        . . f f f f . . . . f . f . . 
        . . . . . . . . . f . . f . . 
        . . . . . . . . . f . . . f . 
        . . . . . . . . . . f . . . f 
        `],
    500,
    characterAnimations.rule(Predicate.MovingRight)
    )
    mySpider.setFlag(SpriteFlag.GhostThroughWalls, true)
    mySpider.setPosition(mySprite.x, mySprite.y)
    attackPower += 1
}
for (let value2 of playerOneBees) {
    if (value2 == "Average Bee") {
        spawn_bee(sprites.create(img`
            . . . 5 5 5 5 . . . 
            . . . 5 5 5 5 . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . 5 5 5 5 . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . . f f . . . . 
            . . . . . . . . . . 
            `, SpriteKind.Bee), "Average Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 5 5 5 5 . . . 
            . . . 5 5 5 5 . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . 5 5 5 5 . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . . f f . . . . 
            `], [img`
            . . . . f f . . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . 5 5 5 5 . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . 5 5 5 5 . . . 
            . . . f 5 5 f . . . 
            . . . 5 5 5 5 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . f f 5 f 5 f 5 5 . 
            f f f 5 f 5 f 5 5 . 
            f f f 5 f 5 f 5 5 . 
            . f f 5 f 5 f 5 5 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 5 5 f 5 f 5 f f . 
            . 5 5 f 5 f 5 f f f 
            . 5 5 f 5 f 5 f f f 
            . 5 5 f 5 f 5 f f . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Common", 25)
    } else if (value2 == "Boring Bee") {
        spawn_bee(sprites.create(img`
            . . . . b b . . . . 
            . . . b b b b . . . 
            . . . b b b b . . . 
            . . . d d d d . . . 
            9 9 9 b b b b 9 9 9 
            9 9 9 d d d d 9 9 9 
            9 9 9 b b b b 9 9 9 
            . . . d d d d . . . 
            . . . f d d f . . . 
            . . . d d d d . . . 
            `, SpriteKind.Bee), "Boring Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . d d d d . . . 
            . . . d d d d . . . 
            9 9 9 b b b b 9 9 9 
            9 9 9 d d d d 9 9 9 
            9 9 9 b b b b 9 9 9 
            . . . d d d d . . . 
            . . . b b b b . . . 
            . . . b b b b . . . 
            . . . . b b . . . . 
            `], [img`
            . . . . b b . . . . 
            . . . b b b b . . . 
            . . . b b b b . . . 
            . . . d d d d . . . 
            9 9 9 b b b b 9 9 9 
            9 9 9 d d d d 9 9 9 
            9 9 9 b b b b 9 9 9 
            . . . d d d d . . . 
            . . . f d d f . . . 
            . . . d d d d . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . b b d b d b d d . 
            b b b d b d b d d . 
            b b b d b d b d d . 
            . b b d b d b d d . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . d d b d b d b b . 
            . d d b d b d b b b 
            . d d b d b d b b b 
            . d d b d b d b b . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Uncommon", 25)
    } else if (value2 == "Dirty Bee") {
        spawn_bee(sprites.create(img`
            . . . . e e . . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . d d d d . . . 
            9 9 9 e e e e 9 9 9 
            9 9 9 d d d d 9 9 9 
            9 9 9 e e e e 9 9 9 
            . . . d d d d . . . 
            . . . f d d f . . . 
            . . . d d d d . . . 
            `, SpriteKind.Bee), "Dirty Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . d d d d . . . 
            . . . d d d d . . . 
            9 9 9 e e e e 9 9 9 
            9 9 9 d d d d 9 9 9 
            9 9 9 e e e e 9 9 9 
            . . . d d d d . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . . e e . . . . 
            `], [img`
            . . . . e e . . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . d d d d . . . 
            9 9 9 e e e e 9 9 9 
            9 9 9 d d d d 9 9 9 
            9 9 9 e e e e 9 9 9 
            . . . d d d d . . . 
            . . . f d d f . . . 
            . . . d d d d . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . e e d e d e d d . 
            e e e d e d e d d . 
            e e e d e d e d d . 
            . e e d e d e d d . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . d d e d e d e e . 
            . d d e d e d e e e 
            . d d e d e d e e e 
            . d d e d e d e e . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Uncommon", 25)
    } else if (value2 == "Grass Bee") {
        spawn_bee(sprites.create(img`
            . . . . 6 6 . . . . 
            . . . 6 6 6 6 . . . 
            . . . 6 6 6 6 . . . 
            . . . 7 7 7 7 . . . 
            9 9 9 6 6 6 6 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 6 6 6 6 9 9 9 
            . . . 7 7 7 7 . . . 
            . . . f 7 7 f . . . 
            . . . 7 7 7 7 . . . 
            `, SpriteKind.Bee), "Grass Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 7 7 7 7 . . . 
            . . . 7 7 7 7 . . . 
            9 9 9 6 6 6 6 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 6 6 6 6 9 9 9 
            . . . 7 7 7 7 . . . 
            . . . 6 6 6 6 . . . 
            . . . 6 6 6 6 . . . 
            . . . . 6 6 . . . . 
            `], [img`
            . . . . 6 6 . . . . 
            . . . 6 6 6 6 . . . 
            . . . 6 6 6 6 . . . 
            . . . 7 7 7 7 . . . 
            9 9 9 6 6 6 6 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 6 6 6 6 9 9 9 
            . . . 7 7 7 7 . . . 
            . . . f 7 7 f . . . 
            . . . 7 7 7 7 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 6 6 7 6 7 6 7 7 . 
            6 6 6 7 6 7 6 7 7 . 
            6 6 6 7 6 7 6 7 7 . 
            . 6 6 7 6 7 6 7 7 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 7 7 6 7 6 7 6 6 . 
            . 7 7 6 7 6 7 6 6 6 
            . 7 7 6 7 6 7 6 6 6 
            . 7 7 6 7 6 7 6 6 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Rare", 30)
    } else if (value2 == "Tree Bee") {
        spawn_bee(sprites.create(img`
            . . . . e e . . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . 7 7 7 7 . . . 
            9 9 9 e e e e 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 e e e e 9 9 9 
            . . . 7 7 7 7 . . . 
            . . . f 7 7 f . . . 
            . . . 7 7 7 7 . . . 
            `, SpriteKind.Bee), "Tree Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 7 7 7 7 . . . 
            . . . 7 7 7 7 . . . 
            9 9 9 e e e e 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 e e e e 9 9 9 
            . . . 7 7 7 7 . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . . e e . . . . 
            `], [img`
            . . . . e e . . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . 7 7 7 7 . . . 
            9 9 9 e e e e 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 e e e e 9 9 9 
            . . . 7 7 7 7 . . . 
            . . . f 7 7 f . . . 
            . . . 7 7 7 7 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . e e 7 e 7 e 7 7 . 
            e e e 7 e 7 e 7 7 . 
            e e e 7 e 7 e 7 7 . 
            . e e 7 e 7 e 7 7 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 7 7 e 7 e 7 e e . 
            . 7 7 e 7 e 7 e e e 
            . 7 7 e 7 e 7 e e e 
            . 7 7 e 7 e 7 e e . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Rare", 30)
    } else if (value2 == "Blazing Bee") {
        spawn_bee(sprites.create(img`
            . . . . 2 2 . . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            . . . 4 4 4 4 . . . 
            9 9 9 2 2 2 2 9 9 9 
            9 9 9 4 4 4 4 9 9 9 
            9 9 9 2 2 2 2 9 9 9 
            . . . 4 4 4 4 . . . 
            . . . f 4 4 f . . . 
            . . . 4 4 4 4 . . . 
            `, SpriteKind.Bee), "Blazing Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 4 4 4 4 . . . 
            . . . 4 4 4 4 . . . 
            9 9 9 2 2 2 2 9 9 9 
            9 9 9 4 4 4 4 9 9 9 
            9 9 9 2 2 2 2 9 9 9 
            . . . 4 4 4 4 . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            . . . . 2 2 . . . . 
            `], [img`
            . . . . 2 2 . . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            . . . 4 4 4 4 . . . 
            9 9 9 2 2 2 2 9 9 9 
            9 9 9 4 4 4 4 9 9 9 
            9 9 9 2 2 2 2 9 9 9 
            . . . 4 4 4 4 . . . 
            . . . f 4 4 f . . . 
            . . . 4 4 4 4 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 2 2 4 2 4 2 4 4 . 
            2 2 2 4 2 4 2 4 4 . 
            2 2 2 4 2 4 2 4 4 . 
            . 2 2 4 2 4 2 4 4 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 4 4 2 4 2 4 2 2 . 
            . 4 4 2 4 2 4 2 2 2 
            . 4 4 2 4 2 4 2 2 2 
            . 4 4 2 4 2 4 2 2 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Epic", 35)
    } else if (value2 == "Freezing Bee") {
        spawn_bee(sprites.create(img`
            . . . . 6 6 . . . . 
            . . . 6 6 6 6 . . . 
            . . . 6 6 6 6 . . . 
            . . . 9 9 9 9 . . . 
            9 9 9 6 6 6 6 9 9 9 
            9 9 9 9 9 9 9 9 9 9 
            9 9 9 6 6 6 6 9 9 9 
            . . . 9 9 9 9 . . . 
            . . . f 9 9 f . . . 
            . . . 9 9 9 9 . . . 
            `, SpriteKind.Bee), "Freezing Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 9 9 9 9 . . . 
            . . . 9 9 9 9 . . . 
            9 9 9 6 6 6 6 9 9 9 
            9 9 9 9 9 9 9 9 9 9 
            9 9 9 6 6 6 6 9 9 9 
            . . . 9 9 9 9 . . . 
            . . . 6 6 6 6 . . . 
            . . . 6 6 6 6 . . . 
            . . . . 6 6 . . . . 
            `], [img`
            . . . . 6 6 . . . . 
            . . . 6 6 6 6 . . . 
            . . . 6 6 6 6 . . . 
            . . . 9 9 9 9 . . . 
            9 9 9 6 6 6 6 9 9 9 
            9 9 9 9 9 9 9 9 9 9 
            9 9 9 6 6 6 6 9 9 9 
            . . . 9 9 9 9 . . . 
            . . . f 9 9 f . . . 
            . . . 9 9 9 9 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 6 6 9 6 9 6 9 9 . 
            6 6 6 9 6 9 6 9 9 . 
            6 6 6 9 6 9 6 9 9 . 
            . 6 6 9 6 9 6 9 9 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 9 9 6 9 6 9 6 6 . 
            . 9 9 6 9 6 9 6 6 6 
            . 9 9 6 9 6 9 6 6 6 
            . 9 9 6 9 6 9 6 6 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Epic", 25)
    } else if (value2 == "Robot Bee") {
        spawn_bee(sprites.create(img`
            . . . . f f . . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . c a 5 b . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 c 8 2 b 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . b 4 7 b . . . 
            . . . f c c f . . . 
            . . . b c c c . . . 
            `, SpriteKind.Bee), "Robot Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . b c c c . . . 
            . . . b 4 7 b . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 c 8 2 b 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . c a 5 b . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . . f f . . . . 
            `], [img`
            . . . . f f . . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . c a 5 b . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 c 8 2 b 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . b 4 7 b . . . 
            . . . f c c f . . . 
            . . . b c c c . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . f f c f c f b b . 
            f f f a f 8 f 4 c . 
            f f f 5 f 2 f 7 c . 
            . f f b f b f b c . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . b b f c f c f f . 
            . c 4 f 8 f a f f f 
            . c 7 f 2 f 5 f f f 
            . c b f b f b f f . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Legendary", 35)
    } else if (value2 == "Rocket Bee") {
        spawn_bee(sprites.create(img`
            . . . . 2 2 . . . . 
            . . . 2 4 4 2 . . . 
            . . . 2 5 5 2 . . . 
            . . . c c c c . . . 
            9 9 9 b b b b 9 9 9 
            9 9 9 c c c c 9 9 9 
            9 9 9 b b b b 9 9 9 
            . . . c c c c . . . 
            . . . f c c f . . . 
            . . . c c c c . . . 
            `, SpriteKind.Bee), "Rocket Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . c c c c . . . 
            . . . c c c c . . . 
            9 9 9 b b b b 9 9 9 
            9 9 9 c c c c 9 9 9 
            9 9 9 b b b b 9 9 9 
            . . . c c c c . . . 
            . . . 2 5 5 2 . . . 
            . . . 2 4 4 2 . . . 
            . . . . 2 2 . . . . 
            `], [img`
            . . . . 2 2 . . . . 
            . . . 2 4 4 2 . . . 
            . . . 2 5 5 2 . . . 
            . . . c c c c . . . 
            9 9 9 b b b b 9 9 9 
            9 9 9 c c c c 9 9 9 
            9 9 9 b b b b 9 9 9 
            . . . c c c c . . . 
            . . . f c c f . . . 
            . . . c c c c . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 2 2 c b c b c c . 
            2 4 5 c b c b c c . 
            2 4 5 c b c b c c . 
            . 2 2 c b c b c c . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . c c b c b c 2 2 . 
            . c c b c b c 5 4 2 
            . c c b c b c 5 4 2 
            . c c b c b c 2 2 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Legendary", 50)
    } else if (value2 == "Rainbow Bee") {
        spawn_bee(sprites.create(img`
            . . . . 2 2 . . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            . . . 8 8 8 8 . . . 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 a a a a 9 9 9 
            . . . 4 4 4 4 . . . 
            . . . f 4 4 f . . . 
            . . . 4 4 4 4 . . . 
            `, SpriteKind.Bee), "Rainbow Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 4 4 4 4 . . . 
            . . . 4 4 4 4 . . . 
            9 9 9 a a a a 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            . . . 8 8 8 8 . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            . . . . 2 2 . . . . 
            `], [img`
            . . . . 2 2 . . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            . . . 8 8 8 8 . . . 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 a a a a 9 9 9 
            . . . 4 4 4 4 . . . 
            . . . f 4 4 f . . . 
            . . . 4 4 4 4 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 2 2 8 5 7 a 4 4 . 
            2 2 2 8 5 7 a 4 4 . 
            2 2 2 8 5 7 a 4 4 . 
            . 2 2 8 5 7 a 4 4 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 4 4 a 7 5 8 2 2 . 
            . 4 4 a 7 5 8 2 2 2 
            . 4 4 a 7 5 8 2 2 2 
            . 4 4 a 7 5 8 2 2 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Mythic", 30)
    } else if (value2 == "Portal Bee") {
        spawn_bee(sprites.create(img`
            . . . . 9 9 . . . . 
            . . . 9 9 9 9 . . . 
            . . . 9 9 9 9 . . . 
            . . . 6 6 6 6 . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 8 8 8 8 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . 8 8 8 8 . . . 
            . . . f 8 8 f . . . 
            . . . 8 8 8 8 . . . 
            `, SpriteKind.Bee), "Portal Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 8 8 8 8 . . . 
            . . . 8 8 8 8 . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 8 8 8 8 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . 6 6 6 6 . . . 
            . . . 9 9 9 9 . . . 
            . . . 9 9 9 9 . . . 
            . . . . 9 9 . . . . 
            `], [img`
            . . . . 9 9 . . . . 
            . . . 9 9 9 9 . . . 
            . . . 9 9 9 9 . . . 
            . . . 6 6 6 6 . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 8 8 8 8 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . 8 8 8 8 . . . 
            . . . f 8 8 f . . . 
            . . . 8 8 8 8 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 9 9 6 f 8 f 8 8 . 
            9 9 9 6 f 8 f 8 8 . 
            9 9 9 6 f 8 f 8 8 . 
            . 9 9 6 f 8 f 8 8 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 8 8 f 8 f 6 9 9 . 
            . 8 8 f 8 f 6 9 9 9 
            . 8 8 f 8 f 6 9 9 9 
            . 8 8 f 8 f 6 9 9 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Mythic", 30)
    } else if (value2 == "Paper Bee") {
        spawn_bee(sprites.create(img`
            . . . . d d . . . . 
            . . . d d d d . . . 
            . . . d d d d . . . 
            . . . 1 1 1 1 . . . 
            9 9 9 d d d d 9 9 9 
            9 9 9 1 1 1 1 9 9 9 
            9 9 9 d d d d 9 9 9 
            . . . 1 1 1 1 . . . 
            . . . f 1 1 f . . . 
            . . . 1 1 1 1 . . . 
            `, SpriteKind.Bee), "Paper Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 1 1 1 1 . . . 
            . . . 1 1 1 1 . . . 
            9 9 9 d d d d 9 9 9 
            9 9 9 1 1 1 1 9 9 9 
            9 9 9 d d d d 9 9 9 
            . . . 1 1 1 1 . . . 
            . . . d d d d . . . 
            . . . d d d d . . . 
            . . . . d d . . . . 
            `], [img`
            . . . . d d . . . . 
            . . . d d d d . . . 
            . . . d d d d . . . 
            . . . 1 1 1 1 . . . 
            9 9 9 d d d d 9 9 9 
            9 9 9 1 1 1 1 9 9 9 
            9 9 9 d d d d 9 9 9 
            . . . 1 1 1 1 . . . 
            . . . f 1 1 f . . . 
            . . . 1 1 1 1 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . d d 1 d 1 d 1 1 . 
            d d d 1 d 1 d 1 1 . 
            d d d 1 d 1 d 1 1 . 
            . d d 1 d 1 d 1 1 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 1 1 d 1 d 1 d d . 
            . 1 1 d 1 d 1 d d d 
            . 1 1 d 1 d 1 d d d 
            . 1 1 d 1 d 1 d d . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Uncommon", 25)
    } else if (value2 == "Mud Bee") {
        spawn_bee(sprites.create(img`
            . . . . e e . . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            9 9 9 e e e e 9 9 9 
            9 9 9 e e e e 9 9 9 
            9 9 9 e e e e 9 9 9 
            . . . e e e e . . . 
            . . . f e e f . . . 
            . . . e e e e . . . 
            `, SpriteKind.Bee), "Mud Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            9 9 9 e e e e 9 9 9 
            9 9 9 e e e e 9 9 9 
            9 9 9 e e e e 9 9 9 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . . e e . . . . 
            `], [img`
            . . . . e e . . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            9 9 9 e e e e 9 9 9 
            9 9 9 e e e e 9 9 9 
            9 9 9 e e e e 9 9 9 
            . . . e e e e . . . 
            . . . f e e f . . . 
            . . . e e e e . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . e e e e e e e e . 
            e e e e e e e e e . 
            e e e e e e e e e . 
            . e e e e e e e e . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . e e e e e e e e . 
            . e e e e e e e e e 
            . e e e e e e e e e 
            . e e e e e e e e . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Uncommon", 25)
    } else if (value2 == "Mechanic Bee") {
        spawn_bee(sprites.create(img`
            . . . . f f . . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . b b b b . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 b b b b 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . b b b b . . . 
            . . . f b b f . . . 
            . . . b b b b . . . 
            `, SpriteKind.Bee), "Mechanic Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . b b b b . . . 
            . . . b b b b . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 b b b b 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . b b b b . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . . f f . . . . 
            `], [img`
            . . . . f f . . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . b b b b . . . 
            9 9 9 f f f f 9 9 9 
            9 9 9 b b b b 9 9 9 
            9 9 9 f f f f 9 9 9 
            . . . b b b b . . . 
            . . . f b b f . . . 
            . . . b b b b . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . f f b f b f b b . 
            f f f b f b f b b . 
            f f f b f b f b b . 
            . f f b f b f b b . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . b b f b f b f f . 
            . b b f b f b f f f 
            . b b f b f b f f f 
            . b b f b f b f f . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Rare", 30)
    } else if (value2 == "Iron Bee") {
        spawn_bee(sprites.create(img`
            . . . . b b . . . . 
            . . . b b b b . . . 
            . . . b b b b . . . 
            . . . c c c c . . . 
            9 9 9 b b b b 9 9 9 
            9 9 9 c c c c 9 9 9 
            9 9 9 b b b b 9 9 9 
            . . . c c c c . . . 
            . . . f c c f . . . 
            . . . c c c c . . . 
            `, SpriteKind.Bee), "Iron Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . c c c c . . . 
            . . . c c c c . . . 
            9 9 9 b b b b 9 9 9 
            9 9 9 c c c c 9 9 9 
            9 9 9 b b b b 9 9 9 
            . . . c c c c . . . 
            . . . b b b b . . . 
            . . . b b b b . . . 
            . . . . b b . . . . 
            `], [img`
            . . . . b b . . . . 
            . . . b b b b . . . 
            . . . b b b b . . . 
            . . . c c c c . . . 
            9 9 9 b b b b 9 9 9 
            9 9 9 c c c c 9 9 9 
            9 9 9 b b b b 9 9 9 
            . . . c c c c . . . 
            . . . f c c f . . . 
            . . . c c c c . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . b b c b c b c c . 
            b b b c b c b c c . 
            b b b c b c b c c . 
            . b b c b c b c c . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . c c b c b c b b . 
            . c c b c b c b b b 
            . c c b c b c b b b 
            . c c b c b c b b . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Rare", 25)
    } else if (value2 == "Aquatic Bee") {
        spawn_bee(sprites.create(img`
            . . . . 8 8 . . . . 
            . . . 8 8 8 8 . . . 
            . . . 8 8 8 8 . . . 
            . . . 6 6 6 6 . . . 
            9 9 9 8 8 8 8 9 9 9 
            9 9 9 6 6 6 6 9 9 9 
            9 9 9 8 8 8 8 9 9 9 
            . . . 6 6 6 6 . . . 
            . . . f 6 6 f . . . 
            . . . 6 6 6 6 . . . 
            `, SpriteKind.Bee), "Aquatic Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 6 6 6 6 . . . 
            . . . 6 6 6 6 . . . 
            9 9 9 8 8 8 8 9 9 9 
            9 9 9 6 6 6 6 9 9 9 
            9 9 9 8 8 8 8 9 9 9 
            . . . 6 6 6 6 . . . 
            . . . 8 8 8 8 . . . 
            . . . 8 8 8 8 . . . 
            . . . . 8 8 . . . . 
            `], [img`
            . . . . 8 8 . . . . 
            . . . 8 8 8 8 . . . 
            . . . 8 8 8 8 . . . 
            . . . 6 6 6 6 . . . 
            9 9 9 8 8 8 8 9 9 9 
            9 9 9 6 6 6 6 9 9 9 
            9 9 9 8 8 8 8 9 9 9 
            . . . 6 6 6 6 . . . 
            . . . f 6 6 f . . . 
            . . . 6 6 6 6 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 8 8 6 8 6 8 6 6 . 
            8 8 8 6 8 6 8 6 6 . 
            8 8 8 6 8 6 8 6 6 . 
            . 8 8 6 8 6 8 6 6 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 6 6 8 6 8 6 8 8 . 
            . 6 6 8 6 8 6 8 8 8 
            . 6 6 8 6 8 6 8 8 8 
            . 6 6 8 6 8 6 8 8 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Epic", 30)
    } else if (value2 == "Candy Bee") {
        spawn_bee(sprites.create(img`
            . . . . a a . . . . 
            . . . a a a a . . . 
            . . . a a a a . . . 
            . . . 2 2 2 2 . . . 
            9 9 9 a a a a 9 9 9 
            9 9 9 2 2 2 2 9 9 9 
            9 9 9 a a a a 9 9 9 
            . . . 2 2 2 2 . . . 
            . . . f 2 2 f . . . 
            . . . 2 2 2 2 . . . 
            `, SpriteKind.Bee), "Candy Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            9 9 9 a a a a 9 9 9 
            9 9 9 2 2 2 2 9 9 9 
            9 9 9 a a a a 9 9 9 
            . . . 2 2 2 2 . . . 
            . . . a a a a . . . 
            . . . a a a a . . . 
            . . . . a a . . . . 
            `], [img`
            . . . . a a . . . . 
            . . . a a a a . . . 
            . . . a a a a . . . 
            . . . 2 2 2 2 . . . 
            9 9 9 a a a a 9 9 9 
            9 9 9 2 2 2 2 9 9 9 
            9 9 9 a a a a 9 9 9 
            . . . 2 2 2 2 . . . 
            . . . f 2 2 f . . . 
            . . . 2 2 2 2 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . a a 2 a 2 a 2 2 . 
            a a a 2 a 2 a 2 2 . 
            a a a 2 a 2 a 2 2 . 
            . a a 2 a 2 a 2 2 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 2 2 a 2 a 2 a a . 
            . 2 2 a 2 a 2 a a a 
            . 2 2 a 2 a 2 a a a 
            . 2 2 a 2 a 2 a a . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Epic", 25)
    } else if (value2 == "Commando Bee") {
        spawn_bee(sprites.create(img`
            . . . . f f . . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . e e 7 7 . . . 
            9 9 9 f f e e 9 9 9 
            9 9 9 7 7 f f 9 9 9 
            9 9 9 e e 7 7 9 9 9 
            . . . 7 7 e e . . . 
            . . . f 7 e f . . . 
            . . . e e 7 e . . . 
            `, SpriteKind.Bee), "Commando Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . e 7 e 7 . . . 
            . . . 7 7 e e . . . 
            9 9 9 e e 7 7 9 9 9 
            9 9 9 7 7 f f 9 9 9 
            9 9 9 f f e e 9 9 9 
            . . . e e 7 7 . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . . f f . . . . 
            `], [img`
            . . . . f f . . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            . . . e e 7 7 . . . 
            9 9 9 f f e e 9 9 9 
            9 9 9 7 7 f f 9 9 9 
            9 9 9 e e 7 7 9 9 9 
            . . . 7 7 e e . . . 
            . . . f 7 e f . . . 
            . . . e e 7 e . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . f f e f 7 e 7 e . 
            f f f e f 7 e 7 7 . 
            f f f 7 e f 7 e e . 
            . f f 7 e f 7 e 7 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . e 7 e 7 f e f f . 
            . 7 7 e 7 f e f f f 
            . e e 7 f e 7 f f f 
            . 7 e 7 f e 7 f f . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Legendary", 35)
    } else if (value2 == "Lightning Bee") {
        spawn_bee(sprites.create(img`
            . . . . 1 1 . . . . 
            . . . 1 1 1 1 . . . 
            . . . 1 1 1 1 . . . 
            . . . 5 5 5 5 . . . 
            9 9 9 1 1 1 1 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 1 1 1 1 9 9 9 
            . . . 5 5 5 5 . . . 
            . . . f 5 5 f . . . 
            . . . 5 5 5 5 . . . 
            `, SpriteKind.Bee), "Lightning Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 5 5 5 5 . . . 
            . . . 5 5 5 5 . . . 
            9 9 9 1 1 1 1 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 1 1 1 1 9 9 9 
            . . . 5 5 5 5 . . . 
            . . . 1 1 1 1 . . . 
            . . . 1 1 1 1 . . . 
            . . . . 1 1 . . . . 
            `], [img`
            . . . . 1 1 . . . . 
            . . . 1 1 1 1 . . . 
            . . . 1 1 1 1 . . . 
            . . . 5 5 5 5 . . . 
            9 9 9 1 1 1 1 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 1 1 1 1 9 9 9 
            . . . 5 5 5 5 . . . 
            . . . f 5 5 f . . . 
            . . . 5 5 5 5 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 1 1 5 1 5 1 5 5 . 
            1 1 1 5 1 5 1 5 5 . 
            1 1 1 5 1 5 1 5 5 . 
            . 1 1 5 1 5 1 5 5 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 5 5 1 5 1 5 1 1 . 
            . 5 5 1 5 1 5 1 1 1 
            . 5 5 1 5 1 5 1 1 1 
            . 5 5 1 5 1 5 1 1 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Legendary", 50)
    } else if (value2 == "Radioactive Bee") {
        spawn_bee(sprites.create(img`
            . . . . 2 2 . . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            . . . 7 7 7 7 . . . 
            9 9 9 2 2 2 2 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 2 2 2 2 9 9 9 
            . . . 7 7 7 7 . . . 
            . . . 2 7 7 2 . . . 
            . . . 7 7 7 7 . . . 
            `, SpriteKind.Bee), "Radioactive Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . 7 7 7 7 . . . 
            . . . 7 7 7 7 . . . 
            9 9 9 2 2 2 2 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 2 2 2 2 9 9 9 
            . . . 7 7 7 7 . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            . . . . 2 2 . . . . 
            `], [img`
            . . . . 2 2 . . . . 
            . . . 2 2 2 2 . . . 
            . . . 2 2 2 2 . . . 
            . . . 7 7 7 7 . . . 
            9 9 9 2 2 2 2 9 9 9 
            9 9 9 7 7 7 7 9 9 9 
            9 9 9 2 2 2 2 9 9 9 
            . . . 7 7 7 7 . . . 
            . . . 2 7 7 2 . . . 
            . . . 7 7 7 7 . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 2 2 7 2 7 2 7 7 . 
            2 2 2 7 2 7 2 7 7 . 
            2 2 2 7 2 7 2 7 7 . 
            . 2 2 7 2 7 2 7 7 . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . 7 7 2 7 2 7 2 2 . 
            . 7 7 2 7 2 7 2 2 2 
            . 7 7 2 7 2 7 2 2 2 
            . 7 7 2 7 2 7 2 2 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Mythic", 30)
    } else if (value2 == "Flower Bee") {
        spawn_bee(sprites.create(img`
            . . . . 1 1 . . . . 
            . . . 1 5 5 1 . . . 
            . . . 1 5 5 1 . . . 
            . . . e 1 1 e . . . 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 e e e e 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            . . . e e e e . . . 
            . . . f e e f . . . 
            . . . e e e e . . . 
            `, SpriteKind.Bee), "Flower Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . e e e e . . . 
            . . . e e e e . . . 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 e e e e 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            . . . e 1 1 e . . . 
            . . . 1 5 5 1 . . . 
            . . . 1 5 5 1 . . . 
            . . . . 1 1 . . . . 
            `], [img`
            . . . . 1 1 . . . . 
            . . . 1 5 5 1 . . . 
            . . . 1 5 5 1 . . . 
            . . . e 1 1 e . . . 
            9 9 9 5 5 5 5 9 9 9 
            9 9 9 e e e e 9 9 9 
            9 9 9 5 5 5 5 9 9 9 
            . . . e e e e . . . 
            . . . f e e f . . . 
            . . . e e e e . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 1 1 e 5 e 5 e e . 
            1 5 5 1 5 e 5 e e . 
            1 5 5 1 5 e 5 e e . 
            . 1 1 e 5 e 5 e e . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . e e 5 e 5 e 1 1 . 
            . e e 5 e 5 1 5 5 1 
            . e e 5 e 5 1 5 5 1 
            . e e 5 e 5 e 1 1 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Mythic", 30)
    } else if (value2 == "Monochrome Bee") {
        spawn_bee(sprites.create(img`
            . . . . 1 1 . . . . 
            . . . 1 1 1 1 . . . 
            . . . 1 1 1 1 . . . 
            . . . f f f f . . . 
            b b b 1 1 1 1 b b b 
            b b b f f f f b b b 
            b b b 1 1 1 1 b b b 
            . . . f f f f . . . 
            . . . 1 f f 1 . . . 
            . . . f f f f . . . 
            `, SpriteKind.Bee), "Monochrome Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . f f f f . . . 
            . . . f f f f . . . 
            b b b 1 1 1 1 b b b 
            b b b f f f f b b b 
            b b b 1 1 1 1 b b b 
            . . . f f f f . . . 
            . . . 1 1 1 1 . . . 
            . . . 1 1 1 1 . . . 
            . . . . 1 1 . . . . 
            `], [img`
            . . . . 1 1 . . . . 
            . . . 1 1 1 1 . . . 
            . . . 1 1 1 1 . . . 
            . . . f f f f . . . 
            b b b 1 1 1 1 b b b 
            b b b f f f f b b b 
            b b b 1 1 1 1 b b b 
            . . . f f f f . . . 
            . . . 1 f f 1 . . . 
            . . . f f f f . . . 
            `], [img`
            . . . . b b b . . . 
            . . . . b b b . . . 
            . . . . b b b . . . 
            . 1 1 f 1 f 1 f f . 
            1 1 1 f 1 f 1 f f . 
            1 1 1 f 1 f 1 f f . 
            . 1 1 f 1 f 1 f f . 
            . . . . b b b . . . 
            . . . . b b b . . . 
            . . . . b b b . . . 
            `], [img`
            . . . b b b . . . . 
            . . . b b b . . . . 
            . . . b b b . . . . 
            . f f 1 f 1 f 1 1 . 
            . f f 1 f 1 f 1 1 1 
            . f f 1 f 1 f 1 1 1 
            . f f 1 f 1 f 1 1 . 
            . . . b b b . . . . 
            . . . b b b . . . . 
            . . . b b b . . . . 
            `], "Special", 25)
    } else if (value2 == "Ultraviolet Bee") {
        spawn_bee(sprites.create(img`
            . . . . 8 8 . . . . 
            . . . 8 8 8 8 . . . 
            . . . 8 8 8 8 . . . 
            . . . a a a a . . . 
            9 9 9 8 8 8 8 9 9 9 
            9 9 9 a a a a 9 9 9 
            9 9 9 8 8 8 8 9 9 9 
            . . . a a a a . . . 
            . . . 8 a a 8 . . . 
            . . . a a a a . . . 
            `, SpriteKind.Bee), "Ultraviolet Bee", "Player One Bee", [img`
            . . . . . . . . . . 
            . . . a a a a . . . 
            . . . a a a a . . . 
            9 9 9 8 8 8 8 9 9 9 
            9 9 9 a a a a 9 9 9 
            9 9 9 8 8 8 8 9 9 9 
            . . . a a a a . . . 
            . . . 8 8 8 8 . . . 
            . . . 8 8 8 8 . . . 
            . . . . 8 8 . . . . 
            `], [img`
            . . . . 8 8 . . . . 
            . . . 8 8 8 8 . . . 
            . . . 8 8 8 8 . . . 
            . . . a a a a . . . 
            9 9 9 8 8 8 8 9 9 9 
            9 9 9 a a a a 9 9 9 
            9 9 9 8 8 8 8 9 9 9 
            . . . a a a a . . . 
            . . . 8 a a 8 . . . 
            . . . a a a a . . . 
            `], [img`
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . 8 8 a 8 a 8 a a . 
            8 8 8 a 8 a 8 a a . 
            8 8 8 a 8 a 8 a a . 
            . 8 8 a 8 a 8 a a . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            . . . . 9 9 9 . . . 
            `], [img`
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . a a 8 a 8 a 8 8 . 
            . a a 8 a 8 a 8 8 8 
            . a a 8 a 8 a 8 8 8 
            . a a 8 a 8 a 8 8 . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            . . . 9 9 9 . . . . 
            `], "Special", 35)
    }
}
game.onUpdateInterval(120000, function () {
    for (let value of tiles.getTilesByType(assets.tile`myTile34`)) {
        mySprite4 = sprites.create(img`
            .....................bbbbbbbbbbbbbbb...................
            ..................bbb...............bbb................
            ................bb.....................bb..............
            ..............bb.........................bb............
            .............b.............................b...........
            ............b...............................b..........
            ..........bb.................................bb........
            .........b.....................................b.......
            ........b.......................................b......
            ........b.......................................b......
            .......b.........................................b.....
            ......b...........................................b....
            .....b.............................................b...
            .....b.............................................b...
            ....b...............................................b..
            ....b...............................................b..
            ...b.................................................b.
            ...b.................................................b.
            ...b.....................9....9......................b.
            ..b.....................95555559......................b
            ..b....................9554554559.....................b
            ..b...................955555555559....................b
            ..b................444554555555455444.................b
            ..b...............4...555545545555...4................b
            ..b...............4...545555555545...4................b
            ..b................444555555555555444.................b
            ..b...............4...555455554555...4................b
            ..b...............4...555555555555...4................b
            ..b................444545455554545444.................b
            ..b...............4...555555555555...4................b
            ..b...............4...455545545554...4................b
            ..b....................4555555554.....................b
            ..b.....................45555554......................b
            ..b......................444444.......................b
            ...b.....................444444......................b.
            ...b.....................444444......................b.
            ...b......................4444.......................b.
            ....b...............................................b..
            ....b...............................................b..
            .....b.............................................b...
            .....b.............................................b...
            ......b...........................................b....
            .......b.........................................b.....
            ........b.......................................b......
            ........b.......................................b......
            .........b.....................................b.......
            ..........bb.................................bb........
            ............b...............................b..........
            .............b.............................b...........
            ..............bb.........................bb............
            ................bb.....................bb..............
            ..................bbb...............bbb................
            .....................bbbbbbbbbbbbbbb...................
            .......................................................
            .......................................................
            `, SpriteKind.Enemy)
        sprites.setDataString(mySprite4, "Enemy", "Golden Ladybug")
        sprites.setDataNumber(mySprite4, "Chance", 100)
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .....................bbbbbbbbbbbbbbb...................
            ..................bbb...............bbb................
            ................bb.....................bb..............
            ..............bb.........................bb............
            .............b.............................b...........
            ............b...............................b..........
            ..........bb.................................bb........
            .........b.....................................b.......
            ........b.......................................b......
            ........b.......................................b......
            .......b.........................................b.....
            ......b...........................................b....
            .....b.............................................b...
            .....b.............................................b...
            ....b...............................................b..
            ....b...............................................b..
            ...b.................................................b.
            ...b.................................................b.
            ...b.....................9....9......................b.
            ..b.....................95555559......................b
            ..b....................9554554559.....................b
            ..b...................955555555559....................b
            ..b................444554555555455444.................b
            ..b...............4...555545545555...4................b
            ..b...................545555555545...4................b
            ..b................444555555555555444.................b
            ..b...............4...555455554555...4................b
            ..b...............4...555555555555....................b
            ..b................444545455554545444.................b
            ..b...............4...555555555555...4................b
            ..b...................455545545554...4................b
            ..b....................4555555554.....................b
            ..b.....................45555554......................b
            ..b......................444444.......................b
            ...b.....................444444......................b.
            ...b.....................444444......................b.
            ...b......................4444.......................b.
            ....b...............................................b..
            ....b...............................................b..
            .....b.............................................b...
            .....b.............................................b...
            ......b...........................................b....
            .......b.........................................b.....
            ........b.......................................b......
            ........b.......................................b......
            .........b.....................................b.......
            ..........bb.................................bb........
            ............b...............................b..........
            .............b.............................b...........
            ..............bb.........................bb............
            ................bb.....................bb..............
            ..................bbb...............bbb................
            .....................bbbbbbbbbbbbbbb...................
            .......................................................
            .......................................................
            `,img`
            .....................bbbbbbbbbbbbbbb...................
            ..................bbb...............bbb................
            ................bb.....................bb..............
            ..............bb.........................bb............
            .............b.............................b...........
            ............b...............................b..........
            ..........bb.................................bb........
            .........b.....................................b.......
            ........b.......................................b......
            ........b.......................................b......
            .......b.........................................b.....
            ......b...........................................b....
            .....b.............................................b...
            .....b.............................................b...
            ....b...............................................b..
            ....b...............................................b..
            ...b.................................................b.
            ...b.................................................b.
            ...b.....................9....9......................b.
            ..b.....................95555559......................b
            ..b....................9554554559.....................b
            ..b...................955555555559....................b
            ..b................444554555555455444.................b
            ..b...............4...555545545555...4................b
            ..b...............4...545555555545....................b
            ..b................444555555555555444.................b
            ..b...............4...555455554555...4................b
            ..b...................555555555555...4................b
            ..b................444545455554545444.................b
            ..b...............4...555555555555...4................b
            ..b...............4...455545545554....................b
            ..b....................4555555554.....................b
            ..b.....................45555554......................b
            ..b......................444444.......................b
            ...b.....................444444......................b.
            ...b.....................444444......................b.
            ...b......................4444.......................b.
            ....b...............................................b..
            ....b...............................................b..
            .....b.............................................b...
            .....b.............................................b...
            ......b...........................................b....
            .......b.........................................b.....
            ........b.......................................b......
            ........b.......................................b......
            .........b.....................................b.......
            ..........bb.................................bb........
            ............b...............................b..........
            .............b.............................b...........
            ..............bb.........................bb............
            ................bb.....................bb..............
            ..................bbb...............bbb................
            .....................bbbbbbbbbbbbbbb...................
            .......................................................
            .......................................................
            `],
        500,
        characterAnimations.rule(Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            .....................bbbbbbbbbbbbbbb...................
            ..................bbb...............bbb................
            ................bb.....................bb..............
            ..............bb.........................bb............
            .............b.............................b...........
            ............b...............................b..........
            ..........bb.................................bb........
            .........b.....................................b.......
            ........b.......................................b......
            ........b.......................................b......
            .......b.........................................b.....
            ......b...........................................b....
            .....b.............................................b...
            .....b.............................................b...
            ....b...............................................b..
            ....b...............................................b..
            ...b......................4444.......................b.
            ...b.....................444444......................b.
            ...b.....................444444......................b.
            ..b......................444444.......................b
            ..b.....................45555554......................b
            ..b....................4555555554.....................b
            ..b...................455545545554...4................b
            ..b...............4...555555555555...4................b
            ..b................444545455554545444.................b
            ..b...............4...555555555555....................b
            ..b...............4...555455554555...4................b
            ..b................444555555555555444.................b
            ..b...................545555555545...4................b
            ..b...............4...555545545555...4................b
            ..b................444554555555455444.................b
            ..b...................955555555559....................b
            ..b....................9554554559.....................b
            ..b.....................95555559......................b
            ...b.....................9....9......................b.
            ...b.................................................b.
            ...b.................................................b.
            ....b...............................................b..
            ....b...............................................b..
            .....b.............................................b...
            .....b.............................................b...
            ......b...........................................b....
            .......b.........................................b.....
            ........b.......................................b......
            ........b.......................................b......
            .........b.....................................b.......
            ..........bb.................................bb........
            ............b...............................b..........
            .............b.............................b...........
            ..............bb.........................bb............
            ................bb.....................bb..............
            ..................bbb...............bbb................
            .....................bbbbbbbbbbbbbbb...................
            `,img`
            .......................................................
            .......................................................
            .....................bbbbbbbbbbbbbbb...................
            ..................bbb...............bbb................
            ................bb.....................bb..............
            ..............bb.........................bb............
            .............b.............................b...........
            ............b...............................b..........
            ..........bb.................................bb........
            .........b.....................................b.......
            ........b.......................................b......
            ........b.......................................b......
            .......b.........................................b.....
            ......b...........................................b....
            .....b.............................................b...
            .....b.............................................b...
            ....b...............................................b..
            ....b...............................................b..
            ...b......................4444.......................b.
            ...b.....................444444......................b.
            ...b.....................444444......................b.
            ..b......................444444.......................b
            ..b.....................45555554......................b
            ..b....................4555555554.....................b
            ..b...............4...455545545554....................b
            ..b...............4...555555555555...4................b
            ..b................444545455554545444.................b
            ..b...................555555555555...4................b
            ..b...............4...555455554555...4................b
            ..b................444555555555555444.................b
            ..b...............4...545555555545....................b
            ..b...............4...555545545555...4................b
            ..b................444554555555455444.................b
            ..b...................955555555559....................b
            ..b....................9554554559.....................b
            ..b.....................95555559......................b
            ...b.....................9....9......................b.
            ...b.................................................b.
            ...b.................................................b.
            ....b...............................................b..
            ....b...............................................b..
            .....b.............................................b...
            .....b.............................................b...
            ......b...........................................b....
            .......b.........................................b.....
            ........b.......................................b......
            ........b.......................................b......
            .........b.....................................b.......
            ..........bb.................................bb........
            ............b...............................b..........
            .............b.............................b...........
            ..............bb.........................bb............
            ................bb.....................bb..............
            ..................bbb...............bbb................
            .....................bbbbbbbbbbbbbbb...................
            `],
        500,
        characterAnimations.rule(Predicate.MovingUp)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            ...................bbbbbbbbbbbbbbb.....................
            ................bbb...............bbb..................
            ..............bb.....................bb................
            ............bb.........................bb..............
            ...........b.............................b.............
            ..........b...............................b............
            ........bb.................................bb..........
            .......b.....................................b.........
            ......b.......................................b........
            ......b.......................................b........
            .....b.........................................b.......
            ....b...........................................b......
            ...b.............................................b.....
            ...b.............................................b.....
            ..b...............................................b....
            ..b...............................................b....
            .b.....................4..44.4.....................b...
            .b....................4..4..4......................b...
            .b....................4..4..4......................b...
            b.....................4..4..4.......................b..
            b....................9555555554.....................b..
            b...................955545554554....................b..
            b..................95545555555554...................b..
            b.................955555554545555444................b..
            b..................545545555554554444...............b..
            b..................555555555555554444...............b..
            b..................555555555555554444...............b..
            b..................545545555554554444...............b..
            b.................955555554545555444................b..
            b..................95545555555554...................b..
            b...................955545554554....................b..
            b....................9555555554.....................b..
            b.....................4..4..4.......................b..
            b.....................4..4..4.......................b..
            .b....................4..4..4......................b...
            .b.....................44.4..44....................b...
            .b.................................................b...
            ..b...............................................b....
            ..b...............................................b....
            ...b.............................................b.....
            ...b.............................................b.....
            ....b...........................................b......
            .....b.........................................b.......
            ......b.......................................b........
            ......b.......................................b........
            .......b.....................................b.........
            ........bb.................................bb..........
            ..........b...............................b............
            ...........b.............................b.............
            ............bb.........................bb..............
            ..............bb.....................bb................
            ................bbb...............bbb..................
            ...................bbbbbbbbbbbbbbb.....................
            `,img`
            .......................................................
            .......................................................
            ...................bbbbbbbbbbbbbbb.....................
            ................bbb...............bbb..................
            ..............bb.....................bb................
            ............bb.........................bb..............
            ...........b.............................b.............
            ..........b...............................b............
            ........bb.................................bb..........
            .......b.....................................b.........
            ......b.......................................b........
            ......b.......................................b........
            .....b.........................................b.......
            ....b...........................................b......
            ...b.............................................b.....
            ...b.............................................b.....
            ..b...............................................b....
            ..b...............................................b....
            .b.....................44.4..44....................b...
            .b....................4..4..4......................b...
            .b....................4..4..4......................b...
            b.....................4..4..4.......................b..
            b....................9555555554.....................b..
            b...................955545554554....................b..
            b..................95545555555554...................b..
            b.................955555554545555444................b..
            b..................545545555554554444...............b..
            b..................555555555555554444...............b..
            b..................555555555555554444...............b..
            b..................545545555554554444...............b..
            b.................955555554545555444................b..
            b..................95545555555554...................b..
            b...................955545554554....................b..
            b....................9555555554.....................b..
            b.....................4..4..4.......................b..
            b.....................4..4..4.......................b..
            .b....................4..4..4......................b...
            .b.....................4..44.4.....................b...
            .b.................................................b...
            ..b...............................................b....
            ..b...............................................b....
            ...b.............................................b.....
            ...b.............................................b.....
            ....b...........................................b......
            .....b.........................................b.......
            ......b.......................................b........
            ......b.......................................b........
            .......b.....................................b.........
            ........bb.................................bb..........
            ..........b...............................b............
            ...........b.............................b.............
            ............bb.........................bb..............
            ..............bb.....................bb................
            ................bbb...............bbb..................
            ...................bbbbbbbbbbbbbbb.....................
            `],
        500,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            .....................bbbbbbbbbbbbbbb...................
            ..................bbb...............bbb................
            ................bb.....................bb..............
            ..............bb.........................bb............
            .............b.............................b...........
            ............b...............................b..........
            ..........bb.................................bb........
            .........b.....................................b.......
            ........b.......................................b......
            ........b.......................................b......
            .......b.........................................b.....
            ......b...........................................b....
            .....b.............................................b...
            .....b.............................................b...
            ....b...............................................b..
            ....b...............................................b..
            ...b.....................4.44..4.....................b.
            ...b......................4..4..4....................b.
            ...b......................4..4..4....................b.
            ..b.......................4..4..4.....................b
            ..b.....................4555555559....................b
            ..b....................455455545559...................b
            ..b...................45555555554559..................b
            ..b................444555545455555559.................b
            ..b...............444455455555545545..................b
            ..b...............444455555555555555..................b
            ..b...............444455555555555555..................b
            ..b...............444455455555545545..................b
            ..b................444555545455555559.................b
            ..b...................45555555554559..................b
            ..b....................455455545559...................b
            ..b.....................4555555559....................b
            ..b.......................4..4..4.....................b
            ..b.......................4..4..4.....................b
            ...b......................4..4..4....................b.
            ...b....................44..4.44.....................b.
            ...b.................................................b.
            ....b...............................................b..
            ....b...............................................b..
            .....b.............................................b...
            .....b.............................................b...
            ......b...........................................b....
            .......b.........................................b.....
            ........b.......................................b......
            ........b.......................................b......
            .........b.....................................b.......
            ..........bb.................................bb........
            ............b...............................b..........
            .............b.............................b...........
            ..............bb.........................bb............
            ................bb.....................bb..............
            ..................bbb...............bbb................
            .....................bbbbbbbbbbbbbbb...................
            `,img`
            .......................................................
            .......................................................
            .....................bbbbbbbbbbbbbbb...................
            ..................bbb...............bbb................
            ................bb.....................bb..............
            ..............bb.........................bb............
            .............b.............................b...........
            ............b...............................b..........
            ..........bb.................................bb........
            .........b.....................................b.......
            ........b.......................................b......
            ........b.......................................b......
            .......b.........................................b.....
            ......b...........................................b....
            .....b.............................................b...
            .....b.............................................b...
            ....b...............................................b..
            ....b...............................................b..
            ...b....................44..4.44.....................b.
            ...b......................4..4..4....................b.
            ...b......................4..4..4....................b.
            ..b.......................4..4..4.....................b
            ..b.....................4555555559....................b
            ..b....................455455545559...................b
            ..b...................45555555554559..................b
            ..b................444555545455555559.................b
            ..b...............444455455555545545..................b
            ..b...............444455555555555555..................b
            ..b...............444455555555555555..................b
            ..b...............444455455555545545..................b
            ..b................444555545455555559.................b
            ..b...................45555555554559..................b
            ..b....................455455545559...................b
            ..b.....................4555555559....................b
            ..b.......................4..4..4.....................b
            ..b.......................4..4..4.....................b
            ...b......................4..4..4....................b.
            ...b.....................4.44..4.....................b.
            ...b.................................................b.
            ....b...............................................b..
            ....b...............................................b..
            .....b.............................................b...
            .....b.............................................b...
            ......b...........................................b....
            .......b.........................................b.....
            ........b.......................................b......
            ........b.......................................b......
            .........b.....................................b.......
            ..........bb.................................bb........
            ............b...............................b..........
            .............b.............................b...........
            ..............bb.........................bb............
            ................bb.....................bb..............
            ..................bbb...............bbb................
            .....................bbbbbbbbbbbbbbb...................
            `],
        500,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        tiles.placeOnTile(mySprite4, value)
        sprites.setDataBoolean(mySprite4, "Follow", true)
        statusbar2 = statusbars.create(30, 5, StatusBarKind.Health)
        statusbar2.max = 1000
        statusbar2.value = 1000
        statusbar2.setBarBorder(1, 15)
        statusbar2.setLabel("Golden Ladybug")
        statusbar2.attachToSprite(mySprite4, 15, 0)
        console.log("spawned golden ladybug")
    }
    sprites.setDataImageValue(mySprite4, "Image", mySprite4.image)
})
game.onUpdateInterval(10000, function () {
    for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
        tiles.setTileAt(value, assets.tile`myTile2`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile30`)) {
        tiles.setTileAt(value, assets.tile`myTile24`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile27`)) {
        tiles.setTileAt(value, assets.tile`myTile10`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile33`)) {
        tiles.setTileAt(value, assets.tile`myTile32`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile46`)) {
        tiles.setTileAt(value, assets.tile`myTile45`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile61`)) {
        tiles.setTileAt(value, assets.tile`myTile59`)
    }
})
game.onUpdateInterval(5000, function () {
    if (honeyStorm) {
        for (let value of tiles.getTilesByType(currentTile)) {
            if (Math.percentChance(25)) {
                if (Math.percentChance(5)) {
                    morphFruitToken = sprites.create(img`
                        . . e e e e e e . . 
                        . e e e 7 e e e e . 
                        e e e e e 7 e e e e 
                        e e e 5 5 5 5 e e e 
                        e e 5 5 f 5 f 5 e e 
                        e e 5 f 5 f 5 f e e 
                        e e 5 f 5 5 5 f e e 
                        e e 5 5 5 5 5 5 e e 
                        . e e 5 5 5 5 e e . 
                        . . e e e e e e . . 
                        `, SpriteKind.MorphFruit)
                    tiles.placeOnTile(morphFruitToken, value)
                    morphFruitToken.lifespan = 7500
                } else {
                    honeyToken = sprites.create(img`
                        . . 5 5 5 5 5 5 . . 
                        . 5 5 5 4 5 5 5 5 . 
                        5 5 5 4 4 5 5 5 5 5 
                        5 5 4 4 4 4 5 5 5 5 
                        5 5 4 4 4 4 5 5 5 5 
                        5 5 4 4 4 4 4 5 5 5 
                        5 5 4 4 4 4 4 5 5 5 
                        5 5 5 4 4 4 5 5 5 5 
                        . 5 5 5 5 5 5 5 5 . 
                        . . 5 5 5 5 5 5 . . 
                        `, SpriteKind.Honey)
                    tiles.placeOnTile(honeyToken, value)
                    honeyToken.lifespan = 7500
                }
            }
        }
    }
    if (boss) {
        for (let value of tiles.getTilesByType(assets.tile`myTile13`)) {
            if (Math.percentChance(5)) {
                tiles.setTileAt(value, assets.tile`myTile51`)
                timer.after(2500, function () {
                    tiles.setTileAt(value, assets.tile`myTile52`)
                    timer.after(5000, function () {
                        tiles.setTileAt(value, assets.tile`myTile13`)
                    })
                })
            }
        }
    }
})
game.onUpdateInterval(60000, function () {
    for (let value of tiles.getTilesByType(assets.tile`myTile47`)) {
        mySprite4 = sprites.create(img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7.................................................7.
            ...7.................................................7.
            ..7......................666666.......................7
            ..7.....................66777766......................7
            ..7....................6677667766.....................7
            ..7................666667766667766666.................7
            ..7...............6...677666666776...6................7
            ..7...............6...676666666676...6................7
            ..7................666676666666676666.................7
            ..7...............6...676666666676...6................7
            ..7...............6...676666666676...6................7
            ..7................666676666666676666.................7
            ..7...............6...677666666776...6................7
            ..7...............6...667766667766...6................7
            ..7....................6677666766.....................7
            ..7.....................66766766......................7
            ..7......................676676.......................7
            ...7.....................677776......................7.
            ...7.....................627726......................7.
            ...7......................6666.......................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `, SpriteKind.Enemy)
        sprites.setDataString(mySprite4, "Enemy", "Aphid")
        sprites.setDataNumber(mySprite4, "Chance", 10)
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7.................................................7.
            ...7.................................................7.
            ..7......................666666.......................7
            ..7.....................66777766......................7
            ..7....................6677667766.....................7
            ..7................666667766667766666.................7
            ..7...............6...677666666776...6................7
            ..7...............6...676666666676....................7
            ..7................666676666666676666.................7
            ..7...............6...676666666676...6................7
            ..7...................676666666676...6................7
            ..7................666676666666676666.................7
            ..7...............6...677666666776...6................7
            ..7...............6...667766667766....................7
            ..7....................6677666766.....................7
            ..7.....................66766766......................7
            ..7......................676676.......................7
            ...7.....................677776......................7.
            ...7.....................627726......................7.
            ...7......................6666.......................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `,img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7.................................................7.
            ...7.................................................7.
            ..7......................666666.......................7
            ..7.....................66777766......................7
            ..7....................6677667766.....................7
            ..7................666667766667766666.................7
            ..7...............6...677666666776...6................7
            ..7...................676666666676...6................7
            ..7................666676666666676666.................7
            ..7...............6...676666666676...6................7
            ..7...............6...676666666676....................7
            ..7................666676666666676666.................7
            ..7...............6...677666666776...6................7
            ..7...................667766667766...6................7
            ..7....................6677666766.....................7
            ..7.....................66766766......................7
            ..7......................676676.......................7
            ...7.....................677776......................7.
            ...7.....................627726......................7.
            ...7......................6666.......................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `],
        500,
        characterAnimations.rule(Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7......................6666.......................7.
            ...7.....................627726......................7.
            ...7.....................677776......................7.
            ..7......................676676.......................7
            ..7.....................66766766......................7
            ..7....................6677666766.....................7
            ..7...............6...667766667766....................7
            ..7...............6...677666666776...6................7
            ..7................666676666666676666.................7
            ..7...................676666666676...6................7
            ..7...............6...676666666676...6................7
            ..7................666676666666676666.................7
            ..7...............6...676666666676....................7
            ..7...............6...677666666776...6................7
            ..7................666667766667766666.................7
            ..7....................6677667766.....................7
            ..7.....................66777766......................7
            ..7......................666666.......................7
            ...7.................................................7.
            ...7.................................................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `,img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7......................6666.......................7.
            ...7.....................627726......................7.
            ...7.....................677776......................7.
            ..7......................676676.......................7
            ..7.....................66766766......................7
            ..7....................6677666766.....................7
            ..7...................667766667766...6................7
            ..7...............6...677666666776...6................7
            ..7................666676666666676666.................7
            ..7...............6...676666666676....................7
            ..7...............6...676666666676...6................7
            ..7................666676666666676666.................7
            ..7...................676666666676...6................7
            ..7...............6...677666666776...6................7
            ..7................666667766667766666.................7
            ..7....................6677667766.....................7
            ..7.....................66777766......................7
            ..7......................666666.......................7
            ...7.................................................7.
            ...7.................................................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `],
        500,
        characterAnimations.rule(Predicate.MovingUp)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            ...................777777777777777.....................
            ................777...............777..................
            ..............77.....................77................
            ............77.........................77..............
            ...........7.............................7.............
            ..........7...............................7............
            ........77.................................77..........
            .......7.....................................7.........
            ......7.......................................7........
            ......7.......................................7........
            .....7.........................................7.......
            ....7...........................................7......
            ...7.............................................7.....
            ...7.............................................7.....
            ..7...............................................7....
            ..7...............................................7....
            .7.....................66.6..66....................7...
            .7....................6..6..6......................7...
            .7....................6..6..6......................7...
            7.....................6..6..6.......................7..
            7.....................666666666.....................7..
            7....................66777777766....................7..
            7...................6677666667766...................7..
            7..................66776666666776666................7..
            7..................677666666666777726...............7..
            7..................676666666666666776...............7..
            7..................676666666666666776...............7..
            7..................677666666666677726...............7..
            7..................66776666666776666................7..
            7...................6677666667766...................7..
            7....................66777777766....................7..
            7.....................666666666.....................7..
            7.....................6..6..6.......................7..
            7.....................6..6..6.......................7..
            .7....................6..6..6......................7...
            .7.....................6..66.6.....................7...
            .7.................................................7...
            ..7...............................................7....
            ..7...............................................7....
            ...7.............................................7.....
            ...7.............................................7.....
            ....7...........................................7......
            .....7.........................................7.......
            ......7.......................................7........
            ......7.......................................7........
            .......7.....................................7.........
            ........77.................................77..........
            ..........7...............................7............
            ...........7.............................7.............
            ............77.........................77..............
            ..............77.....................77................
            ................777...............777..................
            ...................777777777777777.....................
            `,img`
            .......................................................
            .......................................................
            ...................777777777777777.....................
            ................777...............777..................
            ..............77.....................77................
            ............77.........................77..............
            ...........7.............................7.............
            ..........7...............................7............
            ........77.................................77..........
            .......7.....................................7.........
            ......7.......................................7........
            ......7.......................................7........
            .....7.........................................7.......
            ....7...........................................7......
            ...7.............................................7.....
            ...7.............................................7.....
            ..7...............................................7....
            ..7...............................................7....
            .7.....................6..66.6.....................7...
            .7....................6..6..6......................7...
            .7....................6..6..6......................7...
            7.....................6..6..6.......................7..
            7.....................666666666.....................7..
            7....................66777777766....................7..
            7...................6677666667766...................7..
            7..................66776666666776666................7..
            7..................677666666666777726...............7..
            7..................676666666666666776...............7..
            7..................676666666666666776...............7..
            7..................677666666666677726...............7..
            7..................66776666666776666................7..
            7...................6677666667766...................7..
            7....................66777777766....................7..
            7.....................666666666.....................7..
            7.....................6..6..6.......................7..
            7.....................6..6..6.......................7..
            .7....................6..6..6......................7...
            .7.....................66.6..66....................7...
            .7.................................................7...
            ..7...............................................7....
            ..7...............................................7....
            ...7.............................................7.....
            ...7.............................................7.....
            ....7...........................................7......
            .....7.........................................7.......
            ......7.......................................7........
            ......7.......................................7........
            .......7.....................................7.........
            ........77.................................77..........
            ..........7...............................7............
            ...........7.............................7.............
            ............77.........................77..............
            ..............77.....................77................
            ................777...............777..................
            ...................777777777777777.....................
            `],
        500,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7....................66..6.66.....................7.
            ...7......................6..6..6....................7.
            ...7......................6..6..6....................7.
            ..7.......................6..6..6.....................7
            ..7.....................666666666.....................7
            ..7....................66777777766....................7
            ..7...................6677666667766...................7
            ..7................66667766666667766..................7
            ..7...............627777666666666776..................7
            ..7...............677666666666666676..................7
            ..7...............677666666666666676..................7
            ..7...............627776666666666776..................7
            ..7................66667766666667766..................7
            ..7...................6677666667766...................7
            ..7....................66777777766....................7
            ..7.....................666666666.....................7
            ..7.......................6..6..6.....................7
            ..7.......................6..6..6.....................7
            ...7......................6..6..6....................7.
            ...7.....................6.66..6.....................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `,img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.....................6.66..6.....................7.
            ...7......................6..6..6....................7.
            ...7......................6..6..6....................7.
            ..7.......................6..6..6.....................7
            ..7.....................666666666.....................7
            ..7....................66777777766....................7
            ..7...................6677666667766...................7
            ..7................66667766666667766..................7
            ..7...............627777666666666776..................7
            ..7...............677666666666666676..................7
            ..7...............677666666666666676..................7
            ..7...............627776666666666776..................7
            ..7................66667766666667766..................7
            ..7...................6677666667766...................7
            ..7....................66777777766....................7
            ..7.....................666666666.....................7
            ..7.......................6..6..6.....................7
            ..7.......................6..6..6.....................7
            ...7......................6..6..6....................7.
            ...7....................66..6.66.....................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `],
        500,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        tiles.placeOnTile(mySprite4, value)
        sprites.setDataBoolean(mySprite4, "Follow", true)
        sprites.setDataImageValue(mySprite4, "Image", mySprite4.image)
        statusbar2 = statusbars.create(30, 5, StatusBarKind.Health)
        statusbar2.max = 250
        statusbar2.value = 250
        statusbar2.setBarBorder(1, 15)
        statusbar2.setLabel("Aphid")
        statusbar2.attachToSprite(mySprite4, 15, 0)
        console.log("spawned aphid")
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile21`)) {
        mySprite4 = sprites.create(img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7.................................................7.
            ...7.....................c....c......................7.
            ..7.....................cffffffc......................7
            ..7....................cffffffffc.....................7
            ..7...................cffffffffffc....................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff...f................7
            ..7...............f...ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff...f................7
            ..7...............f...ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff...f................7
            ..7...............f...ffffffffffff...f................7
            ..7....................ffffffffff.....................7
            ..7.....................ffffffff......................7
            ..7......................ffffff.......................7
            ...7.....................ffffff......................7.
            ...7.....................f2ff2f......................7.
            ...7......................ffff.......................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `, SpriteKind.Enemy)
        sprites.setDataString(mySprite4, "Enemy", "Beetle")
        sprites.setDataNumber(mySprite4, "Chance", 5)
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7.................................................7.
            ...7.....................c....c......................7.
            ..7.....................cffffffc......................7
            ..7....................cffffffffc.....................7
            ..7...................cffffffffffc....................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff...f................7
            ..7...............f...ffffffffffff....................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff...f................7
            ..7...................ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff...f................7
            ..7...............f...ffffffffffff....................7
            ..7....................ffffffffff.....................7
            ..7.....................ffffffff......................7
            ..7......................ffffff.......................7
            ...7.....................ffffff......................7.
            ...7.....................f2ff2f......................7.
            ...7......................ffff.......................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `,img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7.................................................7.
            ...7.....................c....c......................7.
            ..7.....................cffffffc......................7
            ..7....................cffffffffc.....................7
            ..7...................cffffffffffc....................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff...f................7
            ..7...................ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff...f................7
            ..7...............f...ffffffffffff....................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff...f................7
            ..7...................ffffffffffff...f................7
            ..7....................ffffffffff.....................7
            ..7.....................ffffffff......................7
            ..7......................ffffff.......................7
            ...7.....................ffffff......................7.
            ...7.....................f2ff2f......................7.
            ...7......................ffff.......................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `],
        500,
        characterAnimations.rule(Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7......................ffff.......................7.
            ...7.....................f2ff2f......................7.
            ...7.....................ffffff......................7.
            ..7......................ffffff.......................7
            ..7.....................ffffffff......................7
            ..7....................ffffffffff.....................7
            ..7...............f...ffffffffffff....................7
            ..7...............f...ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...................ffffffffffff...f................7
            ..7...............f...ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff....................7
            ..7...............f...ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...................cffffffffffc....................7
            ..7....................cffffffffc.....................7
            ..7.....................cffffffc......................7
            ...7.....................c....c......................7.
            ...7.................................................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `,img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7......................ffff.......................7.
            ...7.....................f2ff2f......................7.
            ...7.....................ffffff......................7.
            ..7......................ffffff.......................7
            ..7.....................ffffffff......................7
            ..7....................ffffffffff.....................7
            ..7...................ffffffffffff...f................7
            ..7...............f...ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...............f...ffffffffffff....................7
            ..7...............f...ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...................ffffffffffff...f................7
            ..7...............f...ffffffffffff...f................7
            ..7................ffffffffffffffffff.................7
            ..7...................cffffffffffc....................7
            ..7....................cffffffffc.....................7
            ..7.....................cffffffc......................7
            ...7.....................c....c......................7.
            ...7.................................................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `],
        500,
        characterAnimations.rule(Predicate.MovingUp)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            ...................777777777777777.....................
            ................777...............777..................
            ..............77.....................77................
            ............77.........................77..............
            ...........7.............................7.............
            ..........7...............................7............
            ........77.................................77..........
            .......7.....................................7.........
            ......7.......................................7........
            ......7.......................................7........
            .....7.........................................7.......
            ....7...........................................7......
            ...7.............................................7.....
            ...7.............................................7.....
            ..7...............................................7....
            ..7...............................................7....
            .7.....................ff.f..ff....................7...
            .7....................f..f..f......................7...
            .7....................f..f..f......................7...
            7.....................f..f..f.......................7..
            7....................cfffffffff.....................7..
            7...................cfffffffffff....................7..
            7..................cfffffffffffff...................7..
            7.................cfffffffffffffffff................7..
            7..................ffffffffffffffff2f...............7..
            7..................ffffffffffffffffff...............7..
            7..................ffffffffffffffffff...............7..
            7..................ffffffffffffffff2f...............7..
            7.................cfffffffffffffffff................7..
            7..................cfffffffffffff...................7..
            7...................cfffffffffff....................7..
            7....................cfffffffff.....................7..
            7.....................f..f..f.......................7..
            7.....................f..f..f.......................7..
            .7....................f..f..f......................7...
            .7.....................f..ff.f.....................7...
            .7.................................................7...
            ..7...............................................7....
            ..7...............................................7....
            ...7.............................................7.....
            ...7.............................................7.....
            ....7...........................................7......
            .....7.........................................7.......
            ......7.......................................7........
            ......7.......................................7........
            .......7.....................................7.........
            ........77.................................77..........
            ..........7...............................7............
            ...........7.............................7.............
            ............77.........................77..............
            ..............77.....................77................
            ................777...............777..................
            ...................777777777777777.....................
            `,img`
            .......................................................
            .......................................................
            ...................777777777777777.....................
            ................777...............777..................
            ..............77.....................77................
            ............77.........................77..............
            ...........7.............................7.............
            ..........7...............................7............
            ........77.................................77..........
            .......7.....................................7.........
            ......7.......................................7........
            ......7.......................................7........
            .....7.........................................7.......
            ....7...........................................7......
            ...7.............................................7.....
            ...7.............................................7.....
            ..7...............................................7....
            ..7...............................................7....
            .7.....................f..ff.f.....................7...
            .7....................f..f..f......................7...
            .7....................f..f..f......................7...
            7.....................f..f..f.......................7..
            7....................cfffffffff.....................7..
            7...................cfffffffffff....................7..
            7..................cfffffffffffff...................7..
            7.................cfffffffffffffffff................7..
            7..................ffffffffffffffff2f...............7..
            7..................ffffffffffffffffff...............7..
            7..................ffffffffffffffffff...............7..
            7..................ffffffffffffffff2f...............7..
            7.................cfffffffffffffffff................7..
            7..................cfffffffffffff...................7..
            7...................cfffffffffff....................7..
            7....................cfffffffff.....................7..
            7.....................f..f..f.......................7..
            7.....................f..f..f.......................7..
            .7....................f..f..f......................7...
            .7.....................ff.f..ff....................7...
            .7.................................................7...
            ..7...............................................7....
            ..7...............................................7....
            ...7.............................................7.....
            ...7.............................................7.....
            ....7...........................................7......
            .....7.........................................7.......
            ......7.......................................7........
            ......7.......................................7........
            .......7.....................................7.........
            ........77.................................77..........
            ..........7...............................7............
            ...........7.............................7.............
            ............77.........................77..............
            ..............77.....................77................
            ................777...............777..................
            ...................777777777777777.....................
            `],
        500,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7....................ff..f.ff.....................7.
            ...7......................f..f..f....................7.
            ...7......................f..f..f....................7.
            ..7.......................f..f..f.....................7
            ..7.....................fffffffffc....................7
            ..7....................fffffffffffc...................7
            ..7...................fffffffffffffc..................7
            ..7................fffffffffffffffffc.................7
            ..7...............f2ffffffffffffffff..................7
            ..7...............ffffffffffffffffff..................7
            ..7...............ffffffffffffffffff..................7
            ..7...............f2ffffffffffffffff..................7
            ..7................fffffffffffffffffc.................7
            ..7...................fffffffffffffc..................7
            ..7....................fffffffffffc...................7
            ..7.....................fffffffffc....................7
            ..7.......................f..f..f.....................7
            ..7.......................f..f..f.....................7
            ...7......................f..f..f....................7.
            ...7.....................f.ff..f.....................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `,img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.....................f.ff..f.....................7.
            ...7......................f..f..f....................7.
            ...7......................f..f..f....................7.
            ..7.......................f..f..f.....................7
            ..7.....................fffffffffc....................7
            ..7....................fffffffffffc...................7
            ..7...................fffffffffffffc..................7
            ..7................fffffffffffffffffc.................7
            ..7...............f2ffffffffffffffff..................7
            ..7...............ffffffffffffffffff..................7
            ..7...............ffffffffffffffffff..................7
            ..7...............f2ffffffffffffffff..................7
            ..7................fffffffffffffffffc.................7
            ..7...................fffffffffffffc..................7
            ..7....................fffffffffffc...................7
            ..7.....................fffffffffc....................7
            ..7.......................f..f..f.....................7
            ..7.......................f..f..f.....................7
            ...7......................f..f..f....................7.
            ...7....................ff..f.ff.....................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `],
        500,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        tiles.placeOnTile(mySprite4, value)
        sprites.setDataBoolean(mySprite4, "Follow", true)
        sprites.setDataImageValue(mySprite4, "Image", mySprite4.image)
        statusbar2 = statusbars.create(30, 5, StatusBarKind.Health)
        statusbar2.max = 75
        statusbar2.value = 75
        statusbar2.setBarBorder(1, 15)
        statusbar2.setLabel("Beetle")
        statusbar2.attachToSprite(mySprite4, 15, 0)
        console.log("spawned beetle")
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile22`)) {
        mySprite4 = sprites.create(img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7.................................................7.
            ...7.....................9....9......................7.
            ..7.....................92222229......................7
            ..7....................922f22f229.....................7
            ..7...................922222222229....................7
            ..7................fff22f222222f22fff.................7
            ..7...............f...2222f22f2222...f................7
            ..7...............f...2f22222222f2...f................7
            ..7................fff222222222222fff.................7
            ..7...............f...222f2222f222...f................7
            ..7...............f...222222222222...f................7
            ..7................fff2f2f2222f2f2fff.................7
            ..7...............f...222222222222...f................7
            ..7...............f...f222f22f222f...f................7
            ..7....................f22222222f.....................7
            ..7.....................f222222f......................7
            ..7......................ffffff.......................7
            ...7.....................ffffff......................7.
            ...7.....................ffffff......................7.
            ...7......................ffff.......................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `, SpriteKind.Enemy)
        sprites.setDataString(mySprite4, "Enemy", "Ladybug")
        sprites.setDataNumber(mySprite4, "Chance", 2)
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7.................................................7.
            ...7.....................9....9......................7.
            ..7.....................92222229......................7
            ..7....................922f22f229.....................7
            ..7...................922222222229....................7
            ..7................fff22f222222f22fff.................7
            ..7...............f...2222f22f2222...f................7
            ..7...............f...2f22222222f2....................7
            ..7................fff222222222222fff.................7
            ..7...............f...222f2222f222...f................7
            ..7...................222222222222...f................7
            ..7................fff2f2f2222f2f2fff.................7
            ..7...............f...222222222222...f................7
            ..7...............f...f222f22f222f....................7
            ..7....................f22222222f.....................7
            ..7.....................f222222f......................7
            ..7......................ffffff.......................7
            ...7.....................ffffff......................7.
            ...7.....................ffffff......................7.
            ...7......................ffff.......................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `,img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7.................................................7.
            ...7.....................9....9......................7.
            ..7.....................92222229......................7
            ..7....................922f22f229.....................7
            ..7...................922222222229....................7
            ..7................fff22f222222f22fff.................7
            ..7...............f...2222f22f2222...f................7
            ..7...................2f22222222f2...f................7
            ..7................fff222222222222fff.................7
            ..7...............f...222f2222f222...f................7
            ..7...............f...222222222222....................7
            ..7................fff2f2f2222f2f2fff.................7
            ..7...............f...222222222222...f................7
            ..7...................f222f22f222f...f................7
            ..7....................f22222222f.....................7
            ..7.....................f222222f......................7
            ..7......................ffffff.......................7
            ...7.....................ffffff......................7.
            ...7.....................ffffff......................7.
            ...7......................ffff.......................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `],
        500,
        characterAnimations.rule(Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7......................ffff.......................7.
            ...7.....................ffffff......................7.
            ...7.....................ffffff......................7.
            ..7......................ffffff.......................7
            ..7.....................f222222f......................7
            ..7....................f22222222f.....................7
            ..7...............f...f222f22f222f....................7
            ..7...............f...222222222222...f................7
            ..7................fff2f2f2222f2f2fff.................7
            ..7...................222222222222...f................7
            ..7...............f...222f2222f222...f................7
            ..7................fff222222222222fff.................7
            ..7...............f...2f22222222f2....................7
            ..7...............f...2222f22f2222...f................7
            ..7................fff22f222222f22fff.................7
            ..7...................922222222229....................7
            ..7....................922f22f229.....................7
            ..7.....................92222229......................7
            ...7.....................9....9......................7.
            ...7.................................................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `,img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7......................ffff.......................7.
            ...7.....................ffffff......................7.
            ...7.....................ffffff......................7.
            ..7......................ffffff.......................7
            ..7.....................f222222f......................7
            ..7....................f22222222f.....................7
            ..7...................f222f22f222f...f................7
            ..7...............f...222222222222...f................7
            ..7................fff2f2f2222f2f2fff.................7
            ..7...............f...222222222222....................7
            ..7...............f...222f2222f222...f................7
            ..7................fff222222222222fff.................7
            ..7...................2f22222222f2...f................7
            ..7...............f...2222f22f2222...f................7
            ..7................fff22f222222f22fff.................7
            ..7...................922222222229....................7
            ..7....................922f22f229.....................7
            ..7.....................92222229......................7
            ...7.....................9....9......................7.
            ...7.................................................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `],
        500,
        characterAnimations.rule(Predicate.MovingUp)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            ...................777777777777777.....................
            ................777...............777..................
            ..............77.....................77................
            ............77.........................77..............
            ...........7.............................7.............
            ..........7...............................7............
            ........77.................................77..........
            .......7.....................................7.........
            ......7.......................................7........
            ......7.......................................7........
            .....7.........................................7.......
            ....7...........................................7......
            ...7.............................................7.....
            ...7.............................................7.....
            ..7...............................................7....
            ..7...............................................7....
            .7.....................ff.f..ff....................7...
            .7....................f..f..f......................7...
            .7....................f..f..f......................7...
            7.....................f..f..f.......................7..
            7....................922222222f.....................7..
            7...................9222f222f22f....................7..
            7..................922f222222222f...................7..
            7.................92222222f2f2222fff................7..
            7..................2f22f222222f22ffff...............7..
            7..................22222222222222ffff...............7..
            7..................22222222222222ffff...............7..
            7..................2f22f222222f22ffff...............7..
            7.................92222222f2f2222fff................7..
            7..................922f222222222f...................7..
            7...................9222f222f22f....................7..
            7....................922222222f.....................7..
            7.....................f..f..f.......................7..
            7.....................f..f..f.......................7..
            .7....................f..f..f......................7...
            .7.....................f..ff.f.....................7...
            .7.................................................7...
            ..7...............................................7....
            ..7...............................................7....
            ...7.............................................7.....
            ...7.............................................7.....
            ....7...........................................7......
            .....7.........................................7.......
            ......7.......................................7........
            ......7.......................................7........
            .......7.....................................7.........
            ........77.................................77..........
            ..........7...............................7............
            ...........7.............................7.............
            ............77.........................77..............
            ..............77.....................77................
            ................777...............777..................
            ...................777777777777777.....................
            `,img`
            ...................777777777777777.....................
            ................777...............777..................
            ..............77.....................77................
            ............77.........................77..............
            ...........7.............................7.............
            ..........7...............................7............
            ........77.................................77..........
            .......7.....................................7.........
            ......7.......................................7........
            ......7.......................................7........
            .....7.........................................7.......
            ....7...........................................7......
            ...7.............................................7.....
            ...7.............................................7.....
            ..7...............................................7....
            ..7...............................................7....
            .7.................................................7...
            .7.....................ff.f..ff....................7...
            .7....................f..f..f......................7...
            7.....................f..f..f.......................7..
            7.....................f..f..f.......................7..
            7....................922222222f.....................7..
            7...................9222f222f22f....................7..
            7..................922f222222222f...................7..
            7.................92222222f2f2222fff................7..
            7..................2f22f222222f22ffff...............7..
            7..................22222222222222ffff...............7..
            7..................22222222222222ffff...............7..
            7..................2f22f222222f22ffff...............7..
            7.................92222222f2f2222fff................7..
            7..................922f222222222f...................7..
            7...................9222f222f22f....................7..
            7....................922222222f.....................7..
            7.....................f..f..f.......................7..
            .7....................f..f..f......................7...
            .7....................f..f..f......................7...
            .7.....................f..ff.f.....................7...
            ..7...............................................7....
            ..7...............................................7....
            ...7.............................................7.....
            ...7.............................................7.....
            ....7...........................................7......
            .....7.........................................7.......
            ......7.......................................7........
            ......7.......................................7........
            .......7.....................................7.........
            ........77.................................77..........
            ..........7...............................7............
            ...........7.............................7.............
            ............77.........................77..............
            ..............77.....................77................
            ................777...............777..................
            ...................777777777777777.....................
            .......................................................
            .......................................................
            `],
        500,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite4,
        [img`
            .......................................................
            .......................................................
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7....................ff..f.ff.....................7.
            ...7......................f..f..f....................7.
            ...7......................f..f..f....................7.
            ..7.......................f..f..f.....................7
            ..7.....................f222222229....................7
            ..7....................f22f222f2229...................7
            ..7...................f222222222f229..................7
            ..7................fff2222f2f22222229.................7
            ..7...............ffff22f222222f22f2..................7
            ..7...............ffff22222222222222..................7
            ..7...............ffff22222222222222..................7
            ..7...............ffff22f222222f22f2..................7
            ..7................fff2222f2f22222229.................7
            ..7...................f222222222f229..................7
            ..7....................f22f222f2229...................7
            ..7.....................f222222229....................7
            ..7.......................f..f..f.....................7
            ..7.......................f..f..f.....................7
            ...7......................f..f..f....................7.
            ...7.....................f.ff..f.....................7.
            ...7.................................................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            `,img`
            .....................777777777777777...................
            ..................777...............777................
            ................77.....................77..............
            ..............77.........................77............
            .............7.............................7...........
            ............7...............................7..........
            ..........77.................................77........
            .........7.....................................7.......
            ........7.......................................7......
            ........7.......................................7......
            .......7.........................................7.....
            ......7...........................................7....
            .....7.............................................7...
            .....7.............................................7...
            ....7...............................................7..
            ....7...............................................7..
            ...7.................................................7.
            ...7....................ff..f.ff.....................7.
            ...7......................f..f..f....................7.
            ..7.......................f..f..f.....................7
            ..7.......................f..f..f.....................7
            ..7.....................f222222229....................7
            ..7....................f22f222f2229...................7
            ..7...................f222222222f229..................7
            ..7................fff2222f2f22222229.................7
            ..7...............ffff22f222222f22f2..................7
            ..7...............ffff22222222222222..................7
            ..7...............ffff22222222222222..................7
            ..7...............ffff22f222222f22f2..................7
            ..7................fff2222f2f22222229.................7
            ..7...................f222222222f229..................7
            ..7....................f22f222f2229...................7
            ..7.....................f222222229....................7
            ..7.......................f..f..f.....................7
            ...7......................f..f..f....................7.
            ...7......................f..f..f....................7.
            ...7.....................f.ff..f.....................7.
            ....7...............................................7..
            ....7...............................................7..
            .....7.............................................7...
            .....7.............................................7...
            ......7...........................................7....
            .......7.........................................7.....
            ........7.......................................7......
            ........7.......................................7......
            .........7.....................................7.......
            ..........77.................................77........
            ............7...............................7..........
            .............7.............................7...........
            ..............77.........................77............
            ................77.....................77..............
            ..................777...............777................
            .....................777777777777777...................
            .......................................................
            .......................................................
            `],
        500,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        tiles.placeOnTile(mySprite4, value)
        sprites.setDataBoolean(mySprite4, "Follow", true)
        sprites.setDataImageValue(mySprite4, "Image", mySprite4.image)
        statusbar2 = statusbars.create(30, 5, StatusBarKind.Health)
        statusbar2.max = 25
        statusbar2.value = 25
        statusbar2.setBarBorder(1, 15)
        statusbar2.setLabel("Ladybug")
        statusbar2.attachToSprite(mySprite4, 15, 0)
        console.log("spawned ladybug")
    }
})
game.onUpdateInterval(1000, function () {
    statusbar3.value += 5
    if (blockSettings.readNumber("Honey Storm Cooldown") >= 1) {
        blockSettings.writeNumber("Honey Storm Cooldown", blockSettings.readNumber("Honey Storm Cooldown") - 1)
    }
})
game.onUpdate(function () {
    if (!(spriteutils.isDestroyed(textSprite))) {
        textSprite.setText("Honey: " + blockSettings.readNumber("Honey"))
        textSprite.setPosition(mySprite.x, mySprite.y + sprites.readDataNumber(textSprite, "Y Offset"))
    }
    if (!(spriteutils.isDestroyed(textSprite2))) {
        textSprite2.setText("" + statusbar.value + "/" + statusbar.max)
        textSprite2.setPosition(mySprite.x, mySprite.y + sprites.readDataNumber(textSprite2, "Y Offset"))
    }
    if (playerOneBees.length >= 5) {
        for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile8`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
    }
    if (playerOneBees.length >= 10) {
        for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
    }
    if (playerOneBees.length >= 15) {
        for (let value of tiles.getTilesByType(assets.tile`myTile35`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile36`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
    }
    if (playerOneBees.length >= 20) {
        for (let value of tiles.getTilesByType(assets.tile`myTile39`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile40`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
    }
    if (playerOneBees.length >= 25) {
        for (let value of tiles.getTilesByType(assets.tile`myTile56`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile57`)) {
            tiles.setTileAt(value, assets.tile`myTile1`)
            tiles.setWallAt(value, false)
        }
    }
    if (cooldown <= 0) {
        cooldown = 1
    }
    if (autoConvert) {
        blockSettings.writeNumber("Honey", blockSettings.readNumber("Honey") + statusbar.value * blockSettings.readNumber("Multiplier"))
        statusbar.value = 0
    }
    if (boss) {
        for (let value of tiles.getTilesByType(currentTile)) {
            if (tiles.tileAtLocationIsWall(value)) {
                tiles.setTileAt(value, assets.tile`myTile54`)
            } else {
                tiles.setTileAt(value, assets.tile`myTile13`)
            }
        }
        sprites.destroyAllSpritesOfKind(SpriteKind.Web)
    }
    if (statusbar3.value === 0) {
        game.setDialogFrame(img`
            f f f f f f f f f f f f f f f f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            f f f f f f f f f f f f f f f f
        `)
        game.setDialogCursor(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)
        game.showLongText("You got eaten!", DialogLayout.Full)
        game.reset()
    }
})
