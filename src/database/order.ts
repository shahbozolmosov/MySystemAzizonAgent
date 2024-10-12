import SQLite from 'react-native-sqlite-storage';
import {Order} from '../app/services/order/order.ts';
// Add Order
export const addOrder = async (db: SQLite.SQLiteDatabase, order: Order) => {
    const {
        id,
        client,
        sana,
        izoh,
        agent,
        dostavchik,
        dostavka_id,
        dostavchik_telefon,
        status,
        vaqt,
        old_client_balans,
        belgilangan_chegirma,
        mahsulot_soni,
        buyurtma_massa,
        jami_massa,
        taxmin_summa,
        tasdiqlangan_summa,
        taxmin_chegirma,
        tasdiqlangan_chegirma,
        tolov_summa,
        product_list,
        after_balans,
    } = order;

    const query = `
    INSERT INTO Orders (id, client, customer_id, sana, izoh, agent, dostavchik, dostavka_id, dostavchik_telefon, status, vaqt, old_client_balans, belgilangan_chegirma, mahsulot_soni, buyurtma_massa, jami_massa, taxmin_summa, tasdiqlangan_summa, taxmin_chegirma, tasdiqlangan_chegirma, tolov_summa, product_list, after_balans)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

    try {
        await db.executeSql(query, [
            id,
            JSON.stringify(client),
            client.id,
            sana,
            izoh,
            agent,
            dostavchik,
            dostavka_id,
            dostavchik_telefon,
            status,
            vaqt,
            old_client_balans,
            belgilangan_chegirma,
            mahsulot_soni,
            buyurtma_massa,
            jami_massa,
            taxmin_summa,
            tasdiqlangan_summa,
            taxmin_chegirma,
            tasdiqlangan_chegirma,
            tolov_summa,
            JSON.stringify(product_list),
            after_balans,
        ]);
        console.log('Order added successfully');
    } catch (error) {
        console.error('Error adding order: ', error);
    }
};

// Add multiple orders
export const addMultipleOrders = async (
    db: SQLite.SQLiteDatabase,
    orders: Order[],
): Promise<'ok' | null> => {
    const query = `
    INSERT INTO Orders (id, client, customer_id, sana, izoh, agent, dostavchik, dostavka_id, dostavchik_telefon, status, vaqt, old_client_balans, belgilangan_chegirma, mahsulot_soni, buyurtma_massa, jami_massa, taxmin_summa, tasdiqlangan_summa, taxmin_chegirma, tasdiqlangan_chegirma, tolov_summa, product_list, after_balans)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
  `;

    try {
        await db.transaction(tx => {
            for (const order of orders) {
                const {
                    id,
                    client,
                    sana,
                    izoh,
                    agent,
                    dostavchik,
                    dostavka_id,
                    dostavchik_telefon,
                    status,
                    vaqt,
                    old_client_balans,
                    belgilangan_chegirma,
                    mahsulot_soni,
                    buyurtma_massa,
                    jami_massa,
                    taxmin_summa,
                    tasdiqlangan_summa,
                    taxmin_chegirma,
                    tasdiqlangan_chegirma,
                    tolov_summa,
                    product_list,
                    after_balans,
                } = order;

                tx.executeSql(
                    query,
                    [
                        id,
                        JSON.stringify(client), // JSON format
                        client.id,
                        sana,
                        izoh,
                        agent,
                        dostavchik,
                        dostavka_id,
                        dostavchik_telefon,
                        status,
                        vaqt,
                        old_client_balans,
                        belgilangan_chegirma,
                        mahsulot_soni,
                        buyurtma_massa,
                        jami_massa,
                        taxmin_summa,
                        tasdiqlangan_summa,
                        taxmin_chegirma,
                        tasdiqlangan_chegirma,
                        tolov_summa,
                        JSON.stringify(product_list), // JSON format
                        after_balans,
                    ],
                    () => {
                        console.log(`Order ${id} added successfully`);
                    },
                    (txObj, error) => {
                        console.error(`Error adding order ${id}: `, error);
                        return false;
                    },
                );
            }
        });
        console.log('Multiple orders added successfully');
        return 'ok';
    } catch (error) {
        console.error('Error adding multiple orders: ', error);
        return null;
    }
};

// Get one order by id
export const getOrderById = async (
    db: SQLite.SQLiteDatabase,
    orderId: string,
) => {
    const query = `SELECT * FROM Orders WHERE id = ?;`;

    try {
        const results = await db.executeSql(query, [orderId]);
        if (results[0].rows.length > 0) {
            const order = results[0].rows.item(0);
            return {
                ...order,
                client: JSON.parse(order.client),
                product_list: JSON.parse(order.product_list),
            };
        } else {
            console.log('Order not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching order: ', error);
    }
};

// Get one order by Customer Id
export const getOrderByCustomerId = async (
    db: SQLite.SQLiteDatabase,
    customerId: string,
    statuses: string[],
) => {
    const placeholders = statuses.map(() => '?').join(',');
    const query = `SELECT * FROM Orders WHERE customer_id = ? AND status IN (${placeholders});`;

    try {
        const results = await db.executeSql(query, [customerId, ...statuses]);
        const orders = [];
        for (let i = 0; i < results[0].rows.length; i++) {
            const order = results[0].rows.item(i);

            orders.push({
                ...order,
                client: JSON.parse(order.client),
                product_list: JSON.parse(order.product_list),
            });
        }

        return orders;
    } catch (error) {
        console.error('Error fetching order: ', error);
    }
};

// Get all orders
export const getAllOrders = async (
    db: SQLite.SQLiteDatabase,
    statuses: string[],
) => {
    const placeholders = statuses.map(() => '?').join(',');
    const query = `SELECT * FROM Orders WHERE status IN (${placeholders});`;

    try {
        const results = await db.executeSql(query, [...statuses]);
        const orders = [];
        for (let i = 0; i < results[0].rows.length; i++) {
            const order = results[0].rows.item(i);
            orders.push({
                ...order,
                client: JSON.parse(order.client),
                product_list: JSON.parse(order.product_list),
            });
        }
        return orders;
    } catch (error) {
        console.error('Error fetching orders: ', error);
    }
};

// Delete all orders
export const deleteAllOrders = async (db: SQLite.SQLiteDatabase) => {
    const query = `DELETE FROM Orders;`;

    try {
        await db.executeSql(query);
        console.log('All orders deleted successfully');
    } catch (error) {
        console.error('Error deleting orders: ', error);
    }
};
