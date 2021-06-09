---
title: Tutorials
hidden: false
order: 1
---

import DocsTutorialsOverview from "../../../components/docs-tutorials-overview"

# Tutorials

<DocsTutorialsOverview/>

## Introduction

Covalent offers the query language **Primer** which makes it easy for users to further process and transform the records in the Covalent API responses for their custom use-cases. Although you can transform and process the records in Javascript or your spreadsheet of choice, learning to query using Primer will make your job much easier.

Primer is available on ALL [Class A endpoints](https://www.covalenthq.com/docs/api/index.html#tag--Class-A):

We use the generic term "record" in reference to the underlying data models available on a supported blockchain: `blocks`, `transactions`, `balances`, `log events`, etc. In the case of `log events`, the data model is even richer and includes the multi-schema business model logic of the underlying smart contract protocol.d

### Comparison with MongoDB

The Primer syntax and functionality is closely modeled after MongoDB - one of the most popular NoSQL databases available today. Although SQL has its uses, we find a JSON-style query language to be a much better fit for the multi-schema, non-relational nature of blockchain data.

<TableWrap>

|MongoDB|Primer|
|---|---|
|Database|Chain ID|
|Collection|Collection (Response)|
|Document|Record|
|Query document|Query document|
|Operator|Operator|

</TableWrap>

The query itself is a well-formed JSON document, which we call a "query document". Besides the slight differences in how we name things, there are no differences in the behavior or functionality of the query system.

## Tutorial Structure

The following tutorials on Primer will walk you through various examples and use-cases to understand how to implement Primer on various Class-A endpoints. It assumes you have read about:
- the Covalent Class-A API endpoints. 
- what Primer is and where does it fit in Covalent's product vision.
- the general process that has to be followed to implement Primer.
- what are different elements of Primer: query parameters and query operators

Please take a look at the [Primer section](../../tools/primer-query) in Developer Tools in case you haven't. 


We have divided the tutorial in four parts:

1. [Querying with Primer Beginner](./query-with-primer-beg) teaches how to filter the records using `match` and how to `sort`, `limit` and `skip` records. 
2. [Querying with Primer Intermediate](./query-with-primer-int) will take a deeper dive into `group` in conjunction with element, aggregation and projection operators. It will also teach how comparision and logical opearators can they be used with the query parameters mentioned in previous tutorial.
3. [Querying with Primer Advanced](./query-with-primer-adv) will teach how to build an aggregation pipeline that closely resembles a data pipeline that can not only match/filter records, but also sort, skip, limit and aggregate records in a single query. 
4. [Use cases](./primer-use-cases) will contain variety of examples from simple to complex in different settings rangin from DeFi to Governance.







