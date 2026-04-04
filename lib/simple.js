import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'

/**
 * Download content from Sekai Komik
 * @param {String} url Sekai Komik URL
 * @returns {Promise<Array<String>>} Array of encoded image URLs
 */
async function sekaikomikDl(url) {
	try {
		let res = await fetch(url)
		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
		
		let $ = cheerio.load(await res.text())
		let data = $('script').map((idx, el) => $(el).html()).toArray()
		data = data.filter(v => /wp-content/i.test(v))
		
		if (!data[0]) throw new Error('No image data found')
		
		// Parse JSON safely without eval()
		const jsonStr = data[0].split('"images":')[1].split('}],')[0]
		const images = JSON.parse(jsonStr)
		
		return images.map(v => encodeURI(v))
	} catch (e) {
		console.error('Error in sekaikomikDl:', e)
		throw e
	}
}

/**
 * Download content from Facebook
 * @param {String} url Facebook URL
 * @returns {Promise<Object>} Object with quality levels and download links
 */
async function facebookDl(url) {
	try {
		if (!url || !url.includes('facebook.com')) {
			throw new Error('Invalid Facebook URL')
		}

		let res = await fetch('https://fdownloader.net/')
		if (!res.ok) throw new Error(`Failed to fetch downloader: ${res.status}`)
		
		let $ = cheerio.load(await res.text())
		let token = $('input[name="__RequestVerificationToken"]').attr('value')
		
		if (!token) throw new Error('Could not find verification token')

		let json = await (await fetch('https://fdownloader.net/api/ajaxSearch', {
			method: 'POST',
			headers: {
				'cookie': res.headers.get('set-cookie'),
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'referer': 'https://fdownloader.net/'
			},
			body: new URLSearchParams(Object.entries({ 
				__RequestVerificationToken: token, 
				q: url 
			}))
		})).json()
		
		let $$ = cheerio.load(json.data)
		let result = {}
		
		$$('.button.is-success.is-small.download-link-fb').each(function () {
			let quality = $$(this).attr('title')?.split(' ')[1]
			let link = $$(this).attr('href')
			if (link && quality) result[quality] = link
		})
		
		return result
	} catch (e) {
		console.error('Error in facebookDl:', e)
		throw e
	}
}

/**
 * Get TikTok user information (stalk)
 * @param {String} user TikTok username
 * @returns {Promise<Object>} User profile information
 */
async function tiktokStalk(user) {
	try {
		if (!user) throw new Error('Username is required')
		
		let res = await axios.get(`https://urlebird.com/user/${encodeURIComponent(user)}/`)
		let $ = cheerio.load(res.data)
		
		let obj = {
			pp_user: $('div[class="col-md-auto justify-content-center text-center"] > img').attr('src'),
			name: $('h1.user').text().trim(),
			username: $('div.content > h5').text().trim(),
			followers: $('div[class="col-7 col-md-auto text-truncate"]').text().trim().split(' ')[1],
			following: $('div[class="col-auto d-none d-sm-block text-truncate"]').text().trim().split(' ')[1],
			description: $('div.content > p').text().trim()
		}
		
		return obj
	} catch (e) {
		console.error('Error in tiktokStalk:', e)
		throw e
	}
}

/**
 * Get Instagram user information (stalk)
 * @param {String} username Instagram username
 * @returns {Promise<Object>} User profile information
 */
async function igStalk(username) {
	try {
		if (!username) throw new Error('Username is required')
		
		username = username.replace(/^@/, '')
		const html = await (await fetch(`https://dumpor.com/v/${encodeURIComponent(username)}`)).text()
		const $ = cheerio.load(html)
		
		const name = $('div.user__title > a > h1').text().trim()
		const userUsername = $('div.user__title > h4').text().trim()
		const description = $('div.user__info-desc').text().trim()
		const profilePic = $('div.user__img')
			.attr('style')
			?.replace("background-image: url('", '')
			.replace("');", '')
		
		const row = $('#user-page > div.container > div > div > div:nth-child(1) > div > a')
		const postsH = row.eq(0).text().replace(/Posts/i, '').trim()
		const followersH = row.eq(2).text().replace(/Followers/i, '').trim()
		const followingH = row.eq(3).text().replace(/Following/i, '').trim()
		
		const list = $('ul.list > li.list__item')
		const posts = parseInt(list.eq(0).text().replace(/Posts/i, '').trim().replace(/\s/g, '')) || 0
		const followers = parseInt(list.eq(1).text().replace(/Followers/i, '').trim().replace(/\s/g, '')) || 0
		const following = parseInt(list.eq(2).text().replace(/Following/i, '').trim().replace(/\s/g, '')) || 0
		
		return {
			name,
			username: userUsername,
			description,
			postsH,
			posts,
			followersH,
			followers,
			followingH,
			following,
			profilePic
		}
	} catch (e) {
		console.error('Error in igStalk:', e)
		throw e
	}
}

export {
	sekaikomikDl,
	igStalk,
	facebookDl,
	tiktokStalk
}