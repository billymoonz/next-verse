# NextVerse

### Roadmap
- [x] Open Source 
- [x] Help Pages
- [x] Authentication W/ Github
- [ ] Admin Panel
- [ ] Course Chapter Editor
- [ ] Course Chapter Lesson Editor
- [ ] Course Lesson Quiz Questions
- [ ] User Course Progress [calculated by their quiz success rate]
- [ ] User Dashboard
- [ ] User Favourites
- [ ] User Subscription


### Data Structure
```
+-- _user
|   +-- name
|   +-- email
|   +-- image
|   +-- admin
|   +-- stripeCustomerId
|   +-- stripeSubscriptionId
|   +-- stripePriceId
|   +-- stripePriceId
|   +-- stripeCurrentPeriodEnd
|   +-- createdAt
|   +-- updatedAt
+-- _chapter
|   +-- name
|   +-- slug
|   +-- description
|   +-- thumbnail
|   +-- lessons
|   +-- authors
|   +-- createdAt
|   +-- updatedAt
+-- _lesson
|   +-- name
|   +-- slug
|   +-- description
|   +-- thumbnail
|   +-- video
|   +-- questions
|   +-- author
|   +-- createdAt
|   +-- updatedAt
```