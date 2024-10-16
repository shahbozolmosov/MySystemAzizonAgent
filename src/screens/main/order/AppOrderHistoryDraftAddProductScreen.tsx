import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Product} from '../../../app/services/product/product';
import Container from '../../../components/common/Container/Container';
import OrderDraftProductCardList from '../../../components/common/OrderDraftProductCard/OrderDraftProductCardList';
import CustomerHeaderOperation from '../../../components/customer/CustomerOperation/CustomerHeaderOperation';
import NoResult from '../../../components/errors/NoResult/NoResult';
import IconButton from '../../../components/ui/IconButton/IconButton';
import {getAllProducts} from '../../../database/products';
import {getDBConnection} from '../../../database/sqlite';
import {AppRootDrawerStackParamList} from '../../../routes/App/AppRootDrawerStack';

type AppOrderHistoryDraftAddProductScreenProps = NativeStackScreenProps<
    AppRootDrawerStackParamList,
    'AppOrderDraftAddProduct'
>;

const AppOrderHistoryDraftAddProductScreen = ({
    route,
}: AppOrderHistoryDraftAddProductScreenProps) => {
    // Route
    const {orderId} = route.params;

    // State
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState<Product[]>([]);

    useEffect(() => {
        setIsLoading(true);
        const initDB = async () => {
            try {
                const db = await getDBConnection();
                const allProducts = await getAllProducts(db);

                if (allProducts) {
                    setProductData(allProducts);
                }
            } catch (err) {
                console.error('Failed to initialize database', err);
            } finally {
                setIsLoading(false);
            }
        };

        initDB();
    }, []);

    const filteredProducts = useMemo(() => {
        return productData.filter(product =>
            product.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
    }, [productData, searchValue]);

    const handleChangeSearch = useCallback((text: string) => {
        setSearchValue(text);
    }, []);

    return (
        <Container>
            <CustomerHeaderOperation
                title="Umumiy"
                showSearch
                setSearchVal={handleChangeSearch}
                customElements={
                    <>
                        <IconButton icon="filter" />
                    </>
                }
            />
            {isLoading ? (
                <Text>Loading...</Text>
            ) : !filteredProducts.length ? (
                <NoResult
                    title="Mahlumotlar topilmadi"
                    desc="Hozircha sizda buyurtmalar mavjud emas!"
                />
            ) : (
                <OrderDraftProductCardList
                    orderDraftId={orderId}
                    list={filteredProducts}
                    deleteBtn={false}
                />
            )}
        </Container>
    );
};

export default React.memo(AppOrderHistoryDraftAddProductScreen);
