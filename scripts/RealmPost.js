import Realm from 'realm';

// class Item {}
// Item.schema = {
//   name: 'Item',
//   properties: {
//     property_type:  'string',
//     want_to: 'string',
//     property_name: 'string',
//     address: 'string'
//   },
// };

const schemaV1 = {
    name: 'Item',
    properties: {
      property_type:  'string',
      want_to: 'string',
      property_name: 'string',
      address: 'string'
    }
};

const schemaV3 = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      id: 'string',
      property_type: 'string',
      want_to: 'string',
      property_name: 'string',
      address: 'string',
      district: 'string',
      city: 'string',
      images: 'string?',
      imagesData: 'string?',
      bedroom: 'string',
      bathroom: 'string',
      parking: 'string',
      size: 'string',
      lot_area: 'string',
      floor_area: 'string',
      land_line: 'string',
      electrical_power: 'string',
      condition: 'string',
      tower: 'string',
      floor: 'string',
      view: 'string',
      certificate: 'string',
      summary: 'string?',
      facilities: 'string',
      curr: 'string',
      selling_price: 'string',
      price_per_year: 'string',
      price_per_month: 'string',
      minRent: 'string',
      name: 'string',
      phone: 'string',
      email: 'string',
      status: 'string',
      postDate: 'date',
      posted: 'bool',
      category: 'string',
      invoice: 'string',
      unique_id: 'string'
    }
};

export default new Realm({
    schema: [schemaV3],
    schemaVersion: 18,
    migration: (oldRealm, newRealm) => {
        // only apply this change if upgrading to schemaVersion 1
        if (oldRealm.schemaVersion < 1) {
            const oldObjects = oldRealm.objects('Item');
            const newObjects = newRealm.objects('Item');

            // loop through all objects and set the name property in the new schema
            // for (let i = 0; i < oldObjects.length; i++) {
            //     newObjects[i].otherName = 'otherName';
            // }
        }
    },
});

// export default new Realm({schema: [Item]});
