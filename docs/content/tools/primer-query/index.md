---
title: Primer
order: 1
hidden: false
---

# Primer

&nbsp;
## Introduction

Primer is a query language built to transform Covalent API responses at query time. Currently available to use on all the [Class A](../../learn/guides/class-a) endpoints, primer exponentially increments the utility of the APIs by providing another layer of transformation right in the query using carefully designed elements discussed [here](#configuration). In an effor to flatten the learning curve for user and due to the non-relational nature of blockchain data, Primer was closely modeled after MongoDB query language - given it resides at the intersection of "easy to use" and "ubiquitousness in non-relational data analytics". More about it can be read [here](/learn/tutorials/#comparison-with-mongodb)

Moreover, Primer's utility extends beyond just a transformation tool because it will play a crucial role in Covalent's decentralized future. Users will be able to consume and create their own APIs (or class C endpoints) by using Primer on top of the Class A endpoints in Primer Appstore (`add link here`.) When they want to consume a class C endpoint created by other users or an other user wants to consume their Class C endpoints, query charges will be payed in CQT (Covalent Query Token) from consumer to the creator.

**Notea** :
- The scope of this document will be limited to Primer.
- If you are already familiar with Primer and wants to play with it use: <Button type="primary" href="add link here"> Covalent Play</Button>

&nbsp;
## Process

In line with Covalent's ELT (Extract Load Transform) philosophy, users will follow this process:
1. Start by picking the most relevant [Class A](../../learn/guides/class-a) endpoints that suits your use case. 
2. After picking the endpoint, it is higly recommended to use the [API docs](https://www.covalenthq.com/docs/api/) to understand the response before proceeding to create a primer transformation.
3. Followed by this, use the [query parameters](#query-parameters) in conjunction with [query operators](#primer-query-operators). 

**Note** You can also look at in-depth tutorials and different use cases from [How-to Guides](#how-to-guides).

&nbsp;
## Configuration

Primer uses two types of elements to execute the query: [Query Parameters](#primer-query-parameters) and [Query Operators](#primer-query-operators). 
&nbsp;
### Primer Query Parameters

Primer query parameters define "what" kind of the top-level transformation is to be applied on the query. Users can filter, sort, skip, limit or group the data or create a transformation pipleline. 
The table below describes the parameters.

|Name|Description|
|---|---|
|primer|Records enter a multi-stage pipeline that transforms the records into aggregated results. Supports `$group` and `Aggregation` operators.|
|match|Filters the records to pass only the documents that match the specified condition(s).|
|group|Groups input elements by the specified _id expression and for each distinct grouping, outputs an element. Grouping by _date_ operators is also possible.|
|sort|Sorts all input records and returns them in ascending or descending sorted order.|
|skip|Skips over the specified number of records|
|limit|Limits the number of records.|

Notes:

- We use the generic term "record" in reference to the underlying data models available on a supported blockchain: `blocks`, `transactions`, `balances`, `log events`, etc. In the case of `log events`, the data model is even richer and includes the multi-schema business model logic of the underlying smart contract protocol.

- These are listed in order of precedence. Eg: If `primer={ ... }` and `match={ ... }` are used, `primer` is executed first.

- All top-level queries including the _primer pipeline_ are executed on the set of records returned after _pagination_. In other words, if you want these queries to include _all_ records, you must set the ```page-number=0``` and the ```page-size=...``` to an amount that includes all records.

- The list is not exhaustive and we will add more later.

&nbsp;
## Primer Query Operators

Primer query operators when used in conjuction with query parameters provide an extra layer of data manipulation. There are 7 different categories of Primer Query Operators:

- [Comparison](#comparison)
- [Logical](#logical)
- [Element](#element)
- [Aggregation](#aggregation)
- [Projection](#projection)
- [Pipeline Aggregation](#pipeline-aggregation)
- [Date Aggregation](#date-aggregation)

&nbsp;
### Comparison

|Name|Description|
|---|---|
|$eq|Matches values that are equal to a specified value.|
|$ne|Matches values that are not equal to a specified value.|
|$gt|Matches values that are greater than a specified value.|
|$gte|Matches values that are greater than or equal to a specified value.
|$lt|Matches values that are less than a specified value.|
|$lte|Matches values that are less than or equal to a specified value.|
|$in|Matches any of the values specified in an array.|
|$nin|Matches none of the values specified in an array.|

_Comparison by date objects is also available._

&nbsp;
### Logical

|Name|Description|
|---|---|
|$and|Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.|
|$not|Inverts the effect of a query expression and returns documents that do not match the query expression.|
|$nor|Joins query clauses with a logical NOR returns all documents that fail to match both clauses.|
|$or|Joins query clauses with a logical OR returns all documents that match the conditions of either clause.|


&nbsp;
### Element

|Name|Description|
|---|---|
|$exists|Matches documents that have the specified field.|


&nbsp;
### Aggregation

|Name|Description|
|---|---|
|$sum|Sums all values with a specified value.|
|$avg|Averages all values with a specified value.|
|$max|Determines maximum of a specified value.|
|$min|Determines minimum of a specified value.|

&nbsp;
### Projection

|Name|Description|
|---|---|
|$elemMatch|Projects the first element in an array that matches the specified $elemMatch condition.|
|$group|Groups input elements by the specified _id expression and for each distinct grouping, outputs an element.|

&nbsp;
### Pipeline Aggregation
**Available within the ```primer pipeline```**
|Name|Description|
|---|---|
|$match|Filters the records to pass only the documents that match the specified condition(s) to the next pipeline stage.|
|$group|Groups input elements by the specified _id expression and for each distinct grouping, outputs an element.|
|$sort|Sorts all input records and returns them in ascending or descending sorted order.|
|$limit|Limits the number of records passed to the next stage in the pipeline.|
|$skip|Skips over the specified number of records and passes the remaining records to the next stage in the pipeline.|

&nbsp;
### Date Aggregation
**Available within ```$group```**

|Name|Description|
|---|---|
|$year|Returns the year portion of a date.|
|$month|Returns the month of a year as a number between 1 and 12.|
|$dayOfMonth|Returns the day of the month as a number between 1 and 31.|
|$hourOfDay|Returns the hour of a day as a number between 0 and 23.|
|$minuteOfDay|Returns the minute of a day as a number between 0 and 1439.|

&nbsp;
## How-to Guides

* [Querying with Primer: Beginner](../../learn/tutorials/query-with-primer-beg)
* [Querying with Primer: Intermediate](../../learn/tutorials/query-with-primer-int)
* [Querying with Primer: Advanced](../../learn/tutorials/query-with-primer-adv)
* [Use Cases](../../learn/tutorials/use-cases)

