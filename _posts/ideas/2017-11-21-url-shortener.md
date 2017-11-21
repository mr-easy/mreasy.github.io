---
layout: post
title: A URL shortener
date: 2017-11-21
idea: idea
---

I was thinking of creating a URL shortener just like goo.gl or bit.ly.
It should be something easy to remember and short, like go.to or li.nk. I don't know if they are available. So, the shortened url will be something like go.to/myForm
It will not require any user creation. Just go to main page www.go.to
Fill a few details and get the shortened link.
First great thing is that we can provide two options: either a random URL or a custom URL.
In random URL, it wil be just like goo.gl/xsdkf..., we can have random characters like lowercase letters, uppercase letters, digits, underscores, etc. And we can also keep the length to be variable which will give us more possiblities.
For user created URLs, we will let user give a name like myForm to get the link go.to/myForm. Or related to their product go.to/pizza_hut. This will make it easier for sharing and remember. e.g we have a form for our techfest registrations like:
Register yourself at:
go.to/techfest_registration or go.to/equilibrio2k18
Of course the URL need to be checked before assigning. It can be done in similar way, usernames are checked.
Next thing is about statistics of that link. Since no user is created in our database. We need to send the creator (via email) another link through which he can access the link's stats. Now again we can have 2 options. Either it can create a sharable stats link like go.to/myForm_stats. Or can select to keep it non sharable, in such a case a random URL will be sent to the creator.
There need to captcha, we don't want to get bombarded by fake URLs.
There also need to be something for deleting the link if not in use.
