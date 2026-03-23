import SQLite from 'react-native-sqlite-storage';
import {Product} from '../app/services/product/product.ts'; // O'z joyini tekshiring

// Add product
export const addProduct = async (
  db: SQLite.SQLiteDatabase,
  product: Product,
) => {
  const {
    id,
    name,
    article,
    nagruzka,
    pishirish,
    price,
    real_price,
    category_id,
    before_ordered,
  } = product;

  const query = `
    INSERT INTO Products (name, article, nagruzka, pishirish, price, real_price, category_id, before_ordered)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    await db.executeSql(query, [
      id,
      name,
      article,
      nagruzka,
      pishirish,
      price,
      real_price,
      category_id,
      before_ordered,
    ]);
    console.log('Product added successfully');
  } catch (error) {
    console.error('Error adding product: ', error);
  }
};

// Add multiple products
export const addMultipleProducts = async (
  db: SQLite.SQLiteDatabase,
  products: Product[],
): Promise<void> => {
  const query = `
    INSERT INTO Products (id, name, article, nagruzka, pishirish, price, real_price, category_id, before_ordered)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); 
  `;

  try {
    await db.transaction(tx => {
      for (const product of products) {
        const {
          id,
          name,
          article,
          nagruzka,
          pishirish,
          price,
          real_price,
          category_id,
          before_ordered,
        } = product;
        tx.executeSql(
          query,
          [
            id,
            name,
            article,
            nagruzka,
            pishirish,
            price,
            real_price,
            category_id,
            before_ordered,
          ],
          () => {
            console.log(`Product ${name} added successfully`);
          },
          (txObj, error) => {
            console.error(`Error adding product ${name}: `, error);
            return false; // stop the transaction on error
          },
        );
      }
    });
    console.log('Multiple products added successfully');
  } catch (error) {
    console.error('Error adding multiple products: ', error);
  }
};

// Get one product by ID
export const getProductById = async (
  db: SQLite.SQLiteDatabase,
  productId: string,
) => {
  const query = `SELECT * FROM Products WHERE id = ?;`;

  try {
    const results = await db.executeSql(query, [productId]);
    if (results[0].rows.length > 0) {
      return results[0].rows.item(0);
    } else {
      console.log('Product not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching product: ', error);
  }
};

// Get all products
export const getAllProducts = async (db: SQLite.SQLiteDatabase) => {
  const query = `SELECT * FROM Products;`;

  try {
    const results = await db.executeSql(query);
    const products = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      products.push(results[0].rows.item(i));
    }
    return products;
  } catch (error) {
    console.error('Error fetching products: ', error);
  }
};

// Delete all products
export const deleteAllProducts = async (db: SQLite.SQLiteDatabase) => {
  const query = `DELETE FROM Products;`;

  try {
    await db.executeSql(query);
    console.log('All products deleted successfully');
  } catch (error) {
    console.log('Error deleting products: ', error);
  }
};
