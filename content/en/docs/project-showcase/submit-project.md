---
title: Template
featuredImage: ../images/covalent-logo.png
description: This doc list instructions for listing project at covalent
hidden: True
draft: true
---

# How to List your Project/dApp
 
![Template banner image](./images/covalent-logo.png) 

**Disclaimer:** The content is created and submitted by the interested project. Covalent only reviews the standards. 

&nbsp;
## Process

Following is the high-level overview of the process that will be followed:
- Fork this repo.
- Introduce your project to us by using this [project template](./showcase-template.md).
- When changes are complete, create a PR to `developement`.

&nbsp;
## Get Started
This guide will help you understand the entire process and getting started.

&nbsp;
### 1. Fork/Clone the Repo

The general idea is to fork this repository, modify your version with your changes, and then submit a PR.

So, as mentioned before, first fork this repository and clone the branch `project-showcase`.

```
git clone -b project-showcase https://github.com/covalenthq/covalent-docs.git   
cd covalent-docs
```


&nbsp;
### 2. Choose Category 

Next, choose the category that relates to your project the most. There is a folder per category. If you think we are missing a category, contact us throught any of these channels and we will create a new folder.

[Discord](https://discord.com/invite/fgZPpq69Dd) | [Telegram](https://t.me/CovalentHQ)

&nbsp;
### 3. Copy and Edit Template

The template can be found [here](./showcase-template.md). 

For example, let's say your project is named "project-name", has logo "project-showcase-logo.png" and related to `tools`. Then, you would need to copy this file inside the following folder and change it's name to `project-name.md`. Then you would follow the [template](./showcase-template.md) to create a content and a banner `project-showcase.png`. After that you will put that banner under `images`.


```
covalent-docs
|--docs
|--|--content
|--|--|--project-showase
|--|--|--|--toold/project-name.md
|--|--|--|--dex
|--|--|--|--images/project-showcase.png
|--|--|--|--governance
|--|--|--|--multichain-analysis
|--|--|--|--nft
|--|--|--|--wallet
|--public
|--resources/_gen
|--s
|--static/static/images
...
```

&nbsp;
### 4.  Feature Your Project

- After placing your project with appropriate tags in its respective directory go to [index.md](./index.md) of that directory.
- Follow the following format to feature your project.

```
## [Project Name](./project-name/)
[![Project Name](./images/your-project-showcase-banner.png)](./project-name)
```

&nbsp;
### 5.  Submit PR

When you think you have made all the changes into the template, you can submit a pull-request from your forked repo to the `development` branch. 

`Don't create a PR directly to main/master!`

We will review it with our standards and if everything is good, your project will be added to our showcase.

**Note**: Some projects that were accepted before we formed a standard so they might not adhere to all the pre-requisites. If you are submitting a PR after `June 15th, 2021`, you must adhere to standards in the template.


