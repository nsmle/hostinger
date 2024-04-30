# Hostinger Domain Searcher 

<center>
  <img src="https://i.postimg.cc/FHcvv1Fq/banner.png" alt="hostinger">
</center>
<p align="center">Search domain name at <a href="https://hostinger.co.id/domain-murah" target="_blank">Hostinger</a> registrar, search and make sure your name is available.</p>


## Installation
Install Globally
- With Npm

  ```bash
  npm i -g hostinger
  ```
- With Yarn

  ```bash
  yarn global add hostinger
  ```


## Usage
```
$ hostinger  google.com  iana  price-low-35000-only
  ^-------^  ^--------^  ^--^  ^------------------^
  |          |           |     |
  |          |           |     +--> Filter.
  |          |           |
  |          |           +--> Registrar.
  |          |          
  |          +---> Domain name.
  |
  +--> Binary (hostinger/domain).
```

### Example: 
- **Use Tld's from [iana](https://data.iana.org/TLD/tlds-alpha-by-domain.txt)**
  ```bash
  hostinger twitter iana
  ```
- **Use Tld's from [hostinger](https://www.hostinger.co.id/domain-murah)**
  ```bash
  hostinger twitter hostinger
  ```
- **Use Tld's from [hostinger homepage domain category](https://www.hostinger.co.id/domain-murah)**
  ```bash
  hostinger twitter hostinger:category
  ```
- **Show domain restriction message**
  ```bash
  hostinger twitter hostinger restriction
  ```
- **Filter price lower than ***$5.5*** USD**
  ```bash
  hostinger twitter hostinger price-low-5.5-only xusd
  ```
- **Filter price higher than ***Rp. 30.0000*****, (hide unmatch)
  ```bash
  hostinger twitter hostinger price-high-30000-only idr
  ```
- **Get domains and parse output to json**, working with/without [jq](https://github.com/jqlang/jq) formattert
  ```bash
  hostinger twitter json | jq
  ```

### Needs details usage?
```motd-usage

  - HOSTINGER DOMAIN SEARCHER -
  -------------------------------------------------------------------------------------

  Search domain name at hosting registrar, search and make sure your name is available.

  $ hostinger  google.com  iana  price-low-35000-only
    ^-------^  ^--------^  ^--^  ^------------------^
    |          |           |     |
    |          |           |     +--> Filter.
    |          |           |
    |          |           +--> Registrar.
    |          |          
    |          +---> Domain name.
    |
    +--> Binary (hostinger/domain).

  To check valid of a domain name in search result
  Please to check at:
  - https://hostinger.co.id/domain-murah

  Usage:
    - hostinger
    - hostinger -h, --help
    - hostinger twitter
    - hostinger twitter iana
    - hostinger twitter hostinger
    - hostinger twitter hostinger:category
    - hostinger twitter hostinger restriction
    - hostinger twitter hostinger:category price-low-100000 idr
    - hostinger twitter hostinger:category price-high-30000-only xidr
    - hostinger twitter hostinger price-high-30000-only restriction idr
    - hostinger twitter iana price-low-3.4 xusd 
    - hostinger twitter json | jq

  Registrar:
    - iana                       - Tld's from iana.org registrar.
    - hostinger                  - Tld's from hostinger.com registrar.
    - hostinger:category         - Tld's from hostinger.com categories registrar.
    - [unparse]/deafult]         - Tld's default from $TLDS list variable.

  Filters:
    - price-low-[amount]         - Search domain by low price.
    - price-high-[amount]        - Search domain by high price.
    - price-low-[amount]-only    - Search domain by low price and hide unfilter result.
    - price-high-[amount]-only   - Search domain by high price and hide unfilter result.
    - hide-discount              - Hide discount.
    - hide-billing               - Hide billing.
    - idr                        - Currency in Rupiah (amount only).
    - xidr                       - Currency in Rupiah (amount with symbol).
    - usd                        - Currency in US Dolar (amount only).
    - xusd                       - Currency in US Dolar (amount with symbol).
    - json                       - Return json.

  Notes:
    - !PRIVACY                   - Domain not include privacy protection.
```

## Contributions
Contributions of any kind welcome!

## License
Licensed under the terms of the [GNU-3.0 license](https://www.gnu.org/licenses/gpl-3.0.txt).