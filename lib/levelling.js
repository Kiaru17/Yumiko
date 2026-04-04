/**
 * Levelling growth factor based on mathematical constants
 * Controls how XP requirements scale with each level
 */
export const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * .75

/**
 * Calculate XP range for a specific level
 * @param {Number} level The player level
 * @param {Number} multiplier XP multiplier (default from global.multiplier)
 * @returns {Object} Object with {min, max, xp} properties
 */
export function xpRange(level, multiplier = global.multiplier || 1) {
    if (level < 0)
        throw new TypeError('level cannot be negative value')
    if (multiplier <= 0)
        throw new TypeError('multiplier must be positive value')
    
    level = Math.floor(level)
    let min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1
    let max = Math.round(Math.pow(level + 1, growth) * multiplier)
    return {
        min,
        max,
        xp: max - min
    }
}

/**
 * Find player level by total XP
 * @param {Number} xp Total experience points
 * @param {Number} multiplier XP multiplier (default from global.multiplier)
 * @returns {Number} Player level
 */
export function findLevel(xp, multiplier = global.multiplier || 1) {
    if (xp === Infinity)
        return Infinity
    if (isNaN(xp))
        return NaN
    if (xp < 0)
        return -1
    if (multiplier <= 0)
        throw new TypeError('multiplier must be positive value')
    
    let level = 0
    do
        level++
    while (xpRange(level, multiplier).min <= xp)
    return --level
}

/**
 * Check if player can level up
 * @param {Number} level Current player level
 * @param {Number} xp Total experience points
 * @param {Number} multiplier XP multiplier (default from global.multiplier)
 * @returns {Boolean} True if player can level up
 */
export function canLevelUp(level, xp, multiplier = global.multiplier || 1) {
    if (level < 0)
        return false
    if (xp === Infinity)
        return true
    if (isNaN(xp))
        return false
    if (xp < 0)
        return false
    if (multiplier <= 0)
        throw new TypeError('multiplier must be positive value')
    
    return level < findLevel(xp, multiplier)
}