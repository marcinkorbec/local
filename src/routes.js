const routes = {
  home: '/',
  login: '/login',
  book: {
    accession: '/book/accession',
    inventory: '/book/inventory',
    deposit: '/book/deposit',
    shortage: '/book/shortage',
  },
  register: {
    museumObjects: '/register/museum-objects',
    evidence: '/register/evidence',
    supportingEvidence: '/register/supportingEvidence',
  },
  inspection: '/inspection',
  inspectionDetails: '/inspection/details/:id',
  typesOfSets: '/types-of-sets',
  pcko: '/pcko',
  documents: '/documents',
  committee: '/committee',
  admin: {
    users: '/admin/users',
    books: '/admin/books/:bookmarkId?',
    generalData: '/admin/generalData/:bookmarkId?',
  },
  report: '/report/:id?',
  itemCreator: '/item-creator/:id?',
};

export default routes;
