---
title: Querying with Primer (Int)
updated: 2021-04-09
type: "📝 Article"
order: 2
hidden: false
author: gane5h
description: Learn how to use Primer's comparison operators and combine query criteria to make compound queries
tags: 
  - Primer
  - Intermediate
  - Group
  - Primer-Query Operators 
---

# Querying with Primer (Intermediate)

In the previous cookbook recipe, we learned how to filter the data from a Class A endpoint using `Match` and how to use `Sort`,`Limit`,`Skip`.
In this tutorial, we will go through very poweful `Group` which can pivot the data and how to use primer-query operators to compound transformations.

In [developer tools](../../tools/primer-query), we gave detailed explanation of all the [operators](../../tools/primer-query#primer-query-operators) currently available with Primer. 

## Primer Syntax

In this section we will cover:

- Group
- Aggregation
- Comparision Operators
- Logical Operators
- Element
- Date Aggregation

### Group

Group primer-query parameter can be used to pivot the response of a class A enpoint on an `_id`. Group supports nesting to access an element just like all the other primer-query parameters. In conjunction with operators, group can provide powerful insights in a single query. Some examples are given below:



```json
---
header: grouping transactions on success
---
group=
{
    "_id": "successful"
}
```

URL: [https://api.covalenthq.com/v1/1/address/0x9fd3e6610C543ee6A9e199B143505b2172057623/transactions_v2/?page-size=9000&group={%22_id%22:%22successful%22}](https://api.covalenthq.com/v1/1/address/0x9fd3e6610C543ee6A9e199B143505b2172057623/transactions_v2/?page-size=9000&group={%22_id%22:%22successful%22}&key=ckey_66c94c405aae4cb38d94092f634)

### Aggregation

In this section, we will see how we can aggregate the data on grouping by `_id`. Syntax for operators begins with a `$`. For example:

```json 
---
header: using sum opeartor
---
  "gas_sum": {
        "$sum": "gas_quote"
    }
```
Using we can similarly use `avg`,`max`,`min`. 

```json
---
header: using group with aggregation
---
group=
    {
        "_id": "successful",
        "gas_sum": {
        "$sum": "gas_quote"
      },
        "gas_avg": {
        "$avg": "gas_quote"
      },
        "gas_max": {
        "$max": "gas_quote"
      },
        "gas_min": {
        "$min": "gas_quote"
      }
    }
```

URL: [https://api.covalenthq.com/v1/1/address/0x9fd3e6610C543ee6A9e199B143505b2172057623/transactions_v2/?page-size=9000&group={
        "_id": "successful",
        "gas_sum": {
        "$sum": "gas_quote"
      },
        "gas_avg": {
        "$avg": "gas_quote"
      },
        "gas_max": {
        "$max": "gas_quote"
      },
        "gas_min": {
        "$min": "gas_quote"
      }
    }](https://api.covalenthq.com/v1/1/address/0x9fd3e6610C543ee6A9e199B143505b2172057623/transactions_v2/?page-size=9000&key=ckey_66c94c405aae4cb38d94092f634&group=%20{%20%22_id%22:%20%22successful%22,%20%22gas_sum%22:%20{%20%22$sum%22:%20%22gas_quote%22%20},%20%22gas_avg%22:%20{%20%22$avg%22:%20%22gas_quote%22%20},%20%22gas_max%22:%20{%20%22$max%22:%20%22gas_quote%22%20},%20%22gas_min%22:%20{%20%22$min%22:%20%22gas_quote%22%20}%20})


### Comparision

[Comparision](`include link here`) operator are used in accordance with match to filter values based on a specific condition. For example:

Let's get all the events by `0x5a6d3b6bf795a3160dc7c139dee9f60ce0f00cae` whose  `tx_offset` was greater than or equal to `30`.

```json
---
header: using gte
---
match={
  "tx_offset": {
    "$gte":30
  }
}
```
URL: 
[https://api.covalenthq.com/v1/1/address/0x5a6d3b6bf795a3160dc7c139dee9f60ce0f00cae/transactions_v2/?match={%20%22tx_offset%22:%20{%20%22$gte%22:30%20}%20}](https://api.covalenthq.com/v1/1/address/0x5a6d3b6bf795a3160dc7c139dee9f60ce0f00cae/transactions_v2/?key=ckey_2230602b71244a05a42158400f7&match={%20%22tx_offset%22:%20{%20%22$gte%22:30%20}%20})

### Logical

Primer [Logical](`logical`) opeartors allow the queries to be overlayed with logical filters. For example,


Let's get all the events on `0xA361718326c15715591c299427c62086F69923D9` which were not `Transfer` and `Approval` events and were made at this address - `0x6f858d52ff946d3a4c91fe5a7cdc408212d17a1b` 

```json
---
header: using $and with $not
---
match=
{
    "$and": [
        {
            "$not": {
                "decoded.name": "Transfer"
            }
        },
        {
            "$not": {
                "decoded.name": "Approval"
            }
        },
      {
      "decoded.params.0.value": "0x6f858d52ff946d3a4c91fe5a7cdc408212d17a1b"
      }
    ]
}
```
URL: 
[https://api.covalenthq.com/v1/1/events/address/0xA361718326c15715591c299427c62086F69923D9/?starting-block=12000000&ending-block=latest&page-size=999999&match={%20%22$and%22:%20[%20{%20%22$not%22:%20{%20%22decoded.name%22:%20%22Transfer%22%20}%20},%20{%20%22$not%22:%20{%20%22decoded.name%22:%20%22Approval%22%20}%20},%20{%20%22decoded.params.0.value%22:%20%220x6f858d52ff946d3a4c91fe5a7cdc408212d17a1b%22%20}%20]%20}](https://api.covalenthq.com/v1/1/events/address/0xA361718326c15715591c299427c62086F69923D9/?starting-block=12000000&ending-block=latest&page-size=999999&key=ckey_2230602b71244a05a42158400f7&match={%20%22$and%22:%20[%20{%20%22$not%22:%20{%20%22decoded.name%22:%20%22Transfer%22%20}%20},%20{%20%22$not%22:%20{%20%22decoded.name%22:%20%22Approval%22%20}%20},%20{%20%22decoded.params.0.value%22:%20%220x6f858d52ff946d3a4c91fe5a7cdc408212d17a1b%22%20}%20]%20})


### Element

Element operator matches the document with a specific field if its true then returns it.

```json
---
header: using match with $exists
---
match= 
{
    "decoded.params.0.value": {
     "$exists":"0x5cbc35DA078c9c2af1f3E3F9DbA4AFbe10bDa16e" 
    }
  }
```
URL:

[https://api.covalenthq.com/v1/1/events/topics/0x9d42cb017eb05bd8944ab536a8b35bc68085931dd5f4356489801453923953f9/?ending-block=latest&sender-address=0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95&match={%20decoded.params.0.value:%20{%20$exists:%220x5cbc35da078c9c2af1f3e3f9dba4afbe10bda16e%22}}](https://api.covalenthq.com/v1/1/events/topics/0x9d42cb017eb05bd8944ab536a8b35bc68085931dd5f4356489801453923953f9/?ending-block=latest&sender-address=0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95&key=ckey_2230602b71244a05a42158400f7&match={%20decoded.params.0.value:%20{%20$exists:%220x5cbc35da078c9c2af1f3e3f9dba4afbe10bda16e%22}})


### Date Aggregation

Date aggreation provides functionality to pivot and aggreagate the date and time of a record with granularity from years to a minute.
For example:

```json
---
header: grouping ob date and time
---
 group={
    "_id": {
        "month": {
            "$month": "block_signed_at"
        },
        "day": {
            "$dayOfMonth": "block_signed_at"
        },
        "year": {
            "$year": "block_signed_at"
        },
        "hour": {
            "$hourOfDay": "block_signed_at"
        }
    },
    "transfer_count": {
                "$sum": 1
            }
 }
```

URL: [https://api.covalenthq.com/v1/1/events/address/0xA361718326c15715591c299427c62086F69923D9/?starting-block=11000000&ending-block=12000000&group={%20%22_id%22:%20{%20%22month%22:%20{%20%22$month%22:%20%22block_signed_at%22%20},%20%22day%22:%20{%20%22$dayOfMonth%22:%20%22block_signed_at%22%20},%20%22year%22:%20{%20%22$year%22:%20%22block_signed_at%22%20},%20%22hour%22:%20{%20%22$hourOfDay%22:%20%22block_signed_at%22%20}%20},%20%22transfer_count%22:%20{%20%22$sum%22:%201%20}%20}](https://api.covalenthq.com/v1/1/events/address/0xA361718326c15715591c299427c62086F69923D9/?starting-block=11000000&ending-block=12000000&group={%20%22_id%22:%20{%20%22month%22:%20{%20%22$month%22:%20%22block_signed_at%22%20},%20%22day%22:%20{%20%22$dayOfMonth%22:%20%22block_signed_at%22%20},%20%22year%22:%20{%20%22$year%22:%20%22block_signed_at%22%20},%20%22hour%22:%20{%20%22$hourOfDay%22:%20%22block_signed_at%22%20}%20},%20%22transfer_count%22:%20{%20%22$sum%22:%201%20}%20}&key=ckey_2230602b71244a05a42158400f7)


## Querying Compound's Governance Intermediate

In this section we will proceed with the Compound Governance example. The `contract_id`  is `0xc0da01a04c3f3e0be433606045bb7017a7323e38`.

`Goal`: To find out how many votes were casted per proposal_id between block starting-block=11000000 and ending-block=12000000.

1. We will work on log_events again. We already know shape of the data from the last exercise.

2. After using the topic calculator we can find that `VoteCast` topic-hash is `0x877856338e13f63d0c36822ff0ef736b80934cd90574a3a5bc9262c39d217c46` 

3. We will apply following `group`on the endpoints to get the 

```json
---
header: votes casted per proposal_id between block starting-block=11000000 and ending-block=12000000
---
group={
    "_id": {
        "month": {
            "$month": "block_signed_at"
        },
        "year": {
            "$year": "block_signed_at"
        },
        "proposal_id": "decoded.params.1.value"
    },
    "vote_count": {
                "$sum": 1
            }
    }

```

URL: [https://api.covalenthq.com/v1/1/events/topics/0x877856338e13f63d0c36822ff0ef736b80934cd90574a3a5bc9262c39d217c46/?ending-block=latest&sender-address=0xc0da01a04c3f3e0be433606045bb7017a7323e38&page-size=999999&group={%20%22_id%22:%20{%20%22month%22:%20{%20%22$month%22:%20%22block_signed_at%22%20},%20%22year%22:%20{%20%22$year%22:%20%22block_signed_at%22%20},%20%22proposal_id%22:%20%22decoded.params.1.value%22%20},%20%22vote_count%22:%20{%20%22$sum%22:%201%20}%20}](https://api.covalenthq.com/v1/1/events/topics/0x877856338e13f63d0c36822ff0ef736b80934cd90574a3a5bc9262c39d217c46/?ending-block=latest&sender-address=0xc0da01a04c3f3e0be433606045bb7017a7323e38&page-size=999999&key=ckey_66c94c405aae4cb38d94092f634&group={%20%22_id%22:%20{%20%22month%22:%20{%20%22$month%22:%20%22block_signed_at%22%20},%20%22year%22:%20{%20%22$year%22:%20%22block_signed_at%22%20},%20%22proposal_id%22:%20%22decoded.params.1.value%22%20},%20%22vote_count%22:%20{%20%22$sum%22:%201%20}%20})