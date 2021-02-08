The Ultimate Guide to Schema Stitching in GraphQL
https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/#d677

Mutations
- https://xuorig.medium.com/graphql-mutation-design-anemic-mutations-dd107ba70496
- https://www.apollographql.com/blog/designing-graphql-mutations-e09de826ed97/

## Why GraphQL

- A type system to express possibilities
- Declarative: clients select what they need and nothing more
- Nice to use schema (evolvable, easy to use, to reason about)

Misconceptions:
- It should not be a layer on top of the database
- doesn't need to be a match of you rest API
- doesn't have to map the mapping the UI

- Is should be an interface to the core domain (front door to domain)

It's a new, so an opportunity to design from scratch (and maybe get it right this time?)

Be an expert at your domain & be expert at graphql (huum)

API First!!!!!!  -> Domain expert should define the schema


## Design tips - Guiding Principles

* design for behaviors or use cases over data (Anemic GraphQL)

Atomicity vs Granularity ?
* stay away from trying to build a "One Size fits all" api
* embrace the different use cases
* prefer optimized fields over  

```
## both are nullable
type Query {
    user(id: ID, login: String): User
}
```

```
## split
type Query {
    userById(id: ID!): User
    userByLogin(login: String!): User
}
```

Put your schema in the repo (git diffs)
breaking change detection:
https://github.com/xuorig/graphql-schema_comparator

graphql-inspector

Scalar types
   DateTime
   Json

Don't use, Int64, Decimal, ...

Documentation, use it



## Extra info

- https://graphql.org/learn/thinking-in-graphs/
- https://blog.logrocket.com/simplifying-the-graphql-data-model/
- https://tech.findmypast.com/graphql-schema-modeling-1/
- ErrorHandling (https://www.youtube.com/watch?v=A5-H6MtTvqk)
- https://hasura.io/blog/graphql-nulls-cheatsheet/
- https://blog.logrocket.com/handling-graphql-errors-like-a-champ-with-unions-and-interfaces/
- https://lessw.medium.com/graphql-api-design-best-practices-a-summary-from-4-years-of-graphql-by-lee-byron-9fb8a82fa89e


- https://www.infoq.com/news/2020/12/netflix-graphql-federation/


Split schema from implementation
- Frontend
- Backend
- Data Architects
=> API discussion

Netflix graphql at scale
Github - 200+ engineers working on GraphQL schema  


https://jkettmann.com/3-ways-for-authorization-with-graphql-and-apollo

make a high quality public API


versioning
@deprecated

which fields are used 
  -> graphql analytics 
  -> Apollo studio



----------------------

DON'T premature add things to your schema
add/remove/update your graph based on client use (mutations)  
-> graphql-schema-registry
-> Apollo studio

DON'T use introspection to power the organization
central place schema repo for Graphql schema
NODE_ENV = production (no introspection & playground)

DON'T make your clients do extra work with the data


-----------------------

naming operations (client)

good: repositoryUrl, likesCount
bad: imageUrlString, descriptionText

description
description(format: "HTML)

---------

Tools:
- https://www.youtube.com/watch?v=bjAFBWjOiXc
- graphqlEditor
- https://www.graphql-tools.com/docs/generate-schema


------

versioning
https://blog.logrocket.com/versioning-fields-graphql/


--------

Security
https://www.youtube.com/watch?v=4_Bcw7BULC8
