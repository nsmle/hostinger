#!/usr/bin/env node

// @ts-nocheck

/**
 * A tool for searching domain names on hostinger websites via CLI.
 * For further questions, please contact: https://github.com/nsmle/
 *
 * @module hostinger
 * @version 1.0.0
 * @since 2024-04-30
 * 
 * @example
 * nsmle@cli:~$ hostinger --help
 *
 * @author Fiki Pratama (nsmle) <fikiproductionofficial@gmail.com>
 * @license GPL-3.0
 * @copyright Copyright (c) 2015 Fiki Pratama.
 * 
 * @see https://github.com/nsmle/
 * @see https://npmjs.com/package/hostinger
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MOTD = readFileSync(__dirname + "/.MOTD", "utf8")

const req = async (urlPath, data, waitMsg) => {
  let waiting;
  if (!args.includes("json"))  {
    let i = 0;  
    waiting = setInterval(() => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      let dots = new Array(i + 1).join(".");
      process.stdout.write(`${waitMsg == undefined ? data?.category ? `Get ${data?.category} domains` :"Please wait" : waitMsg}` + dots);
    }, 300);
  }

  const result =  await fetch(`https://websites-api.hostinger.com/api/domain/${urlPath ?? "single-domain-search"}`, {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer www.hostinger.co.id",
      "Accept": "application/json",
      "Origin": "https://www.hostinger.co.id",
      "Referer": "https://www.hostinger.co.id/",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "id,en-US;q=0.9,en;q=0.8,ko;q=0.7,th;q=0.6,nso;q=0.5,zh-CN;q=0.4,zh-TW;q=0.3,zh;q=0.2",
      // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
    ...(data && {
      body: JSON.stringify(data)
    })
  }).then(res => res.json()).then(json => json?.data ?? json)

  if (!args.includes("json")) {
    clearInterval(waiting)
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
  } 

  return result;

}

let printCount = 1;
const args = process.argv.slice(3);
const filter = args?.slice(1)?.at(0)?.split("-") ?? args;

const ctlds = ["ac", "ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "au", "aw", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "br", "bq", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cs", "cu", "cv", "cw", "cx", "cy", "cz", "dd", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kp", "kr", "kw", "ky", "kz", "la", "lb", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "su", "sv", "sx", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "um", "us", "uy", "uz", "va", "ve", "vg", "vi", "vn", "vu", "ws", "ye", "yu", "za", "zm", "zw"]
const TLDS = [
  {
    category: "popular",
    tlds: ["id", "com", "io", "online", "org", "store", "tech", "shop", "cloud", "site", "co.id", "blog", "co", "fun", "net", "click", "top", "icu", "ai", "pro"],
  }, {
    category:  "business",
    tlds: ["com", "shop", "store", "biz", "company", "agency", "services", "consulting", "solutions", "management", "finance", "group", "marketing", "business", "support", "international", "works", "trade", "supply", "partners"],
  }, {
    category: "international",
    tlds: ["fr", "id", "es", "lt", "nl", "eu", "pl", "de", "me", "my.id", "co", "ch", "uk", "se", "pt", "ro", "it", "us", "org.in", "or.id"],
  }, {
    category: "education",
	  tlds: ["edu", "ac.id", "academy", "education", "university", "institute", "college", "school", "research", "sch.id", "med.br", "ponpes.id"],
  }, {
    category: "media_entertainment",
    tlds: ["blog", "art", "media", "studio", "gallery", "blog.br", "music", "games", "tv", "film", "press", "news", "photo", "photography", "productions"],
  }, {
    category: "technology",
	  tlds: ["tech", "io", "dev", "app", "systems", "digital", "technology", "software", "network", "info", "cloud", "web", "center", "solutions", "hosting", "email", "support", "consulting"]
  }, {
    category: "social_personal",
    tlds: ["fun", "life", "help", "community", "social", "family", "love", "blog", "club", "world", "support", "personal", "space", "dating", "art"],
  }, {
    category: "professional_services",
    tlds: ["biz", "pro", "services", "consulting", "agency", "solutions", "support", "marketing", "advertising", "management", "expert", "professional", "contractor"],
  }, {
    category: "miscellaneous",
    tlds: ["xyz", "top", "uno", "info", "me.uk", "mobi", "name", "asia", "wiki", "center", "wiki.br", "today", "cafe", "click", "cash", "bid", "cheap", "casino", "cool", "eco.br"],
  }, {  
    tlds: ctlds,
  }
]

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


let exchangeRateIdrToUsd = null
const usd = (amountIdr) => {
  const amountUsd = amountIdr / exchangeRateIdrToUsd;
  return amountUsd.toFixed(2);
}

const idr = (price) => {
  if (args.includes("usd") | args.includes("xusd")) return args.includes("xusd") ? `$${usd(price)}` : usd(price)
  let reverse = price.toString().split('').reverse().join('');
  let prc = reverse.match(/\d{1,3}/g);
  let result = prc.join('.').split('').reverse().join('');
  if (args.includes("xidr")) return 'Rp ' + result;
  return result
}

const nx = (txt, pad=22) => {
  let txtDec = txt.replace(/\x1b\[(.*?)m/gim, '')
  return "|".padStart(pad - txtDec.length, ' ')
}

const print_domains = async (domains, hideCount) => {
  const filterPrice = filter ? {type: filter[1], price: Number(filter[2]), only: Boolean(filter[3] == 'only')} : null

  await new Promise(async (resolve, reject) => {
    let ittr = 0;
    for (const d of domains) {
      const pricePurcase = (args.includes("usd") | args.includes("xusd")) ? usd(d.product.price.purchase) : idr(d.product.price.purchase)
      const priceOld = (args.includes("usd") | args.includes("xusd")) ? usd(d.product.price.old) : idr(d.product.price.old)

      if (!hideCount && filterPrice && filterPrice.only && filterPrice.type == "low" && ((args.includes("usd") | args.includes("xusd")) ? Number(pricePurcase) : d.product.price.purchase) > filterPrice.price) continue;
      if (!hideCount && filterPrice && filterPrice.only && filterPrice.type == "high" && ((args.includes("usd") | args.includes("xusd")) ? Number(pricePurcase) : d.product.price.purchase) < filterPrice.price) continue;

      let discount = d.product.price.discount ? `\x1b[3;33m${d.product.price.discount}\x1b[1;30m%\x1b[0m`: "\x1b[1;30m---\x1b[0m"
      let purchase = pricePurcase == priceOld ? `\x1b[3;32m${pricePurcase}\x1b[0m` : `\x1b[3;36m${pricePurcase}\x1b[0m\x1b[1;30m/\x1b[3;31m${priceOld}\x1b[0m` 
      let msg = `${`${hideCount == true ? "✅" : printCount + "."}`.padEnd(5, ' ')}\x1b[0;34m${d.domain_name.replace(d.product.product_slug.replace('domain:',''), `\x1b[1;34m${d.product.product_slug.replace('domain:','')}`)} \x1b[0m${nx(d.domain_name)} `
      if (!args?.includes("hide-discount")) msg += `${discount} ${nx(discount, 4)}  ${purchase}  ${nx(purchase, 22)} `
      if (!args?.includes("hide-billing")) msg +=  (d.multi_year_deal ? '\x1b[5;35m\x1b[1;35m   Pertahun  \x1b[0m' : d.product.price.billing_period.period == 1 ? '\x1b[0;35mTahun Pertama\x1b[0m' : `   \x1b[1;31m${d.product.price.billing_period.period}\x1b[1;30m/\x1b[0;31m${d.product.price.billing_period.period_unit.replace('year', 'Tahun')}\x1b[0m   `) + " |"
      if (d.label.text) msg += `   \x1b[1;36m${d.label.text}\x1b[0m  | `

      if (!d.product?.addons?.privacy_protection) msg += ` \x1b[31m!PRIVACY\x1b[0m | `
      if (args?.includes("restriction") && d.restriction) msg += `\n     \x1b[1;30m${d.restriction}\x1b[0m `
      if (d.tooltip) msg += ` \x1b[1;35mTOOLTIP: ${JSON.stringify(d)}\x1b[0m | `

      if (!hideCount && filterPrice && filterPrice.type == "low" && ((args.includes("usd") | args.includes("xusd")) ? Number(pricePurcase) : d.product.price.purchase) > filterPrice.price) msg = `\x1b[1;30m${msg.replaceAll(/\x1b\[(.*?)m/gmi, "\x1b[1;30m")}\x1b[0m`
      if (!hideCount && filterPrice && filterPrice.type == "high" && ((args.includes("usd") | args.includes("xusd")) ? Number(pricePurcase) : d.product.price.purchase) < filterPrice.price) msg = `\x1b[1;30m${msg.replaceAll(/\x1b\[(.*?)m/gmi, "\x1b[1;30m")}\x1b[0m`

      if (!args.includes("json")) console.log(msg)

      if (ittr == domains.length - 3) resolve()
      await delay(100)
      ittr++;
      if (!hideCount) printCount++
    }

    resolve()
  })
}

const ianaTlds = async () => {
  const result = await fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt").then(res => res.text())
  return result.split("\n").filter(tlds => !tlds.match(/^\#|\-/gmi) && tlds.length).map(tlds => tlds.toLowerCase())
}

const main = async () => {
  const domainName = process.argv.slice(2)?.at(0)
  if (!domainName || args.includes('-h') || args.includes('--help')) return console.log(MOTD)

  const registrar = process.argv.slice(3)?.at(0)
  let domains = []

  if (!args.includes("json")) console.log(`TLDs from ${registrar == 'iana' ? "iana.org" : 'hostinger.co.id'}`)
  let tlds = TLDS
  if (registrar == 'iana') tlds = [{ tlds: await ianaTlds()}]
  if (registrar == 'hostinger') tlds = [{ tlds: await req("available-tlds-by-theme", null, "Get tld's from hostinger")}]
  if (registrar == 'hostinger:category') tlds = await req("categories", null, "Get tld's from hostinger categories")

  const getDomain = async (tlds) => {
    for (const tld of tlds) {
      try {
        if (tld.tlds.length <= 20) {
          const res = await req('search-more-options', {
            domain_name: domainName.split(".")[0],
            main_search_tld: domainName.replace(`${domainName.split(".")?.[0]}.`, ''),
            ...(tld?.category && { 
              category: tld?.category
            }),
            tlds: tld.tlds,
            with_promo: true
          })
          if (res?.error) throw new Error(res?.error?.message) 

          await print_domains(res)
          domains = [...domains, ...res]
        } else {
          let allCatgs = []
          let nextIttr = 0
          for (let i = 0; i < tld.tlds.length; i++) {
            if (allCatgs[nextIttr] == undefined) allCatgs[nextIttr] = { tlds: [] }
            if (allCatgs[nextIttr]?.tlds?.length >= 20) nextIttr++;
            if (allCatgs[nextIttr] == undefined) allCatgs[nextIttr] = { tlds: [] }
            allCatgs[nextIttr].tlds = [...allCatgs[nextIttr]?.tlds, `${tld.tlds[i]}`]
          }

          await getDomain(allCatgs)
        }
      } catch (error) {
        if (!args.includes("json")) console.error(`\x1b[1;31m${tld?.category !== undefined ? `Error get category ${tld?.category}` : error?.message}\x1b[0m`)
      }
    }

  }

  const aiSuggestDomain = async () => {
    const dName = domainName.split(".")?.[0]
    const dTld = domainName.replace(`${dName}.`, '')
    try {
      const res = await req('ai-generated-alternatives', {
        domain_name: dName,
        main_search_tld: dTld !== dName ? dTld : 'id',
        number_of_domains: 20
      }, "Ai Suggestion")
      if (res?.error) throw new Error(Object.values(res?.error?.validation_messages).join(" | ")) 

      await print_domains(res)
      domains = [...domains, ...res]
    } catch (error) {
      if (!args.includes("json")) console.error(`\x1b[1;31mAi Suggestion Error: ${error?.message}\x1b[0m`)
    }
  }



  if (domainName.split(".")?.[1]?.length) {
    const dName = domainName.split(".")?.[0]
    const dTld = domainName.replace(`${dName}.`, '')
    const result = await req("single-domain-search", {
      domain_name: dName,
      tld: dTld
    }, `Check domain ${domainName}`).then(res => res?.result ?? res)

    if (result?.available) {
      if (result?.domain_name !== domainName) console.log(`\x1b[1;31m❌\x1b[0m${"".padEnd(3, ' ')} \x1b[0;34m${dName}\x1b[1;34m.${dTld} \x1b[0m${nx(domainName)} \x1b[0;31mAlready Registered!\x1b[0m`)
      print_domains([result], true)
    } else {
      const errMsg = result?.error?.validation_messages ? Object.values(result?.error?.validation_messages).join(" | ") : result?.error?.validation_messages?.tld?.[0] ?? "Unavailable!"
      if (!args.includes("json")) console.log(`\x1b[1;31m❌\x1b[0m${"".padEnd(3, ' ')} \x1b[0;34m${dName}\x1b[1;34m.${dTld} \x1b[0m${nx(domainName)} \x1b[0;31m${errMsg}\x1b[0m`);
    }

    if (!registrar) return;
    if (!args.includes("json")) console.log("\n")
  }

  if (registrar == 'ai') {
    await aiSuggestDomain()
  } else {
    await getDomain(tlds)
  }


  if (args.includes("json")) {
    await delay(1000)
    console.log(JSON.stringify(domains, undefined, 2)); 
  }
}

const updateReadmeMd = () => {
  const readMe = readFileSync(__dirname + "/README.md", "utf8")
  const readme = readMe.replace(/```motd-usage([^]+?)\n```/gm, "```motd-usage\n" + MOTD + "\n```");
  writeFileSync(__dirname + "/README.md", readme)
  console.log("Motd at README.md updated!")
}

(async() => {
  if (process.argv.includes('update-readme')) return updateReadmeMd() 
  if (args.includes("usd") | args.includes("xusd")) {
    await fetch("https://currencyapi.com/currency-conversion/idr-usd-1")
      .then(res => res.text()).then(html => {
        exchangeRateIdrToUsd = Number(html.match(/<span class="mt-10 text-gray-500 text-md block">([^<]*)<\/span>/)?.[1]?.replaceAll(/\s|\n|USD|IDR|,/gim, "").split("=")?.[1])
      })
  }

  await main()
})()