import React  from 'react';
import { Box, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import StorageAndCatalog from '../StorageAndCatalog';
import VendorSettings from '../VendorSettings';
import VendorUsers from '../VendorUsers';
import ProductsTable from '../../components/StorageAndCatalog/ProductsTable';
import ProductForm from '../../components/StorageAndCatalog/ProductForm';
import CreateShop from '../../components/VendorSettings/CreateShop';
import VendorsTable from '../../components/VendorSettings/VendorsTable';
import EditShop from '../../components/VendorSettings/EditShop';
import FeedbackAndQuestions from "../FeedbackAndQuestions";
import Overview from "../../components/FeedbackAndQuestions/Overview";
import VendorFeedback from "../../components/FeedbackAndQuestions/VendorFeedback";
import VendorQuestions from "../../components/FeedbackAndQuestions/VendorQuestions";
import ProductsQuestions from "../../components/FeedbackAndQuestions/ProductsQuestions";
import ProductsFeedbackList from "../../components/FeedbackAndQuestions/ProductsFeedback/Products";
import ProductsFeedback from "../../components/FeedbackAndQuestions/ProductsFeedback";
import VendorFeedbackTable from "../../components/FeedbackAndQuestions/VendorFeedback/Feedbacks";
import VendorFeedbackView from "../../components/FeedbackAndQuestions/VendorFeedback/Feedback";
import VendorQuestionsList from "../../components/FeedbackAndQuestions/VendorQuestions/Questions";
import VendorQuestionView from "../../components/FeedbackAndQuestions/VendorQuestions/Question";
import UsersTable from "../../components/VendorUsers/UsersTable";
import EditUser from "../../components/VendorUsers/EditUser";
import CreateUser from "../../components/VendorUsers/CreateUser";
import dashboard from '../../assets/placeHolders/dashboard.png';
import DistributorOffers from "../DistributorOffers";
import DistributorTable from "../../components/DistributorOffers/DistributorTable";
import DistributorProduct from "../../components/DistributorOffers/DistributorProduct";
import DistributorOrders from "../DistributorOrders";
import DistributorOrdersTable from "../../components/DistributorOrders/DistributorOrdersTable";
import DistributorOrder from "../../components/DistributorOffers/DistributorOrder";

const MainPage = () => {
  return (
      <Box sx={{ minWidth: '32rem', display: 'flex', flexDirection: 'column'}}>
        <Routes>
          {/* MAIN / ROOT */}
          <Route
              path='/'
              element={<Box sx={{p: 4}}><img src={dashboard} alt="dashboard" style={{width: '100%', maxWidth: '1150px'}} /></Box>}
          >
          </Route>
          {/* STORAGE */}
          <Route path='storage_catalog' element={<StorageAndCatalog/>}>
            <Route index element={<ProductsTable limit={10}/>}/>
            <Route path='add' element={<ProductForm/>}/>
          </Route>
          {/* VENDOR */}
          <Route path='vendor_settings' element={<VendorSettings/>}>
            <Route index element={<VendorsTable limit={10}/>}/>
            <Route path='add' element={<CreateShop/>}/>
            <Route path='edit/:vendorId' element={<EditShop/>}/>
          </Route>

          {/* DISTRIBUTOR OFFERS */}
          <Route path='distributor_offers' element={<DistributorOffers/>}>
            <Route index element={<DistributorTable limit={10}/>}/>
            {/*<Route path='add' element={<CreateShop/>}/>*/}
            <Route path='product/:id' element={<DistributorProduct limit={10} />}/>
            <Route path='product/:id/:vendorId' element={<DistributorOrder />}/>
          </Route>

          {/* MY ORDERS */}
          <Route path='distributor_orders' element={<DistributorOrders/>}>
            <Route index element={<DistributorOrdersTable limit={10}/>}/>
            {/*<Route path='add' element={<CreateShop/>}/>*/}
            {/*<Route path='product/:id' element={<DistributorProduct limit={10} />}/>*/}
          </Route>

          {/* VENDOR USERS */}
          <Route path='vendor_users' element={<VendorUsers/>}>
            <Route index element={<UsersTable limit={10}/>}/>
            <Route path='add' element={<CreateUser/>}/>
            <Route path='edit/:userId' element={<EditUser/>}/>
          </Route>
          {/* FEEDBACK */}
          <Route path='offers' element={<FeedbackAndQuestions/>}>
            <Route index element={<Overview/>}/>
            <Route path='vendor_questions' element={<VendorQuestions/>}>
              <Route index element={<VendorQuestionsList/>} />
              <Route path=':id' element={<VendorQuestionView/>} />
            </Route>
            <Route path='products_questions' element={<ProductsQuestions/>}>
              <Route path=':id' element={<Typography>EL</Typography>} />
            </Route>
            <Route path='products_feedback' element={<ProductsFeedback/>}>
              <Route index element={<ProductsFeedbackList/>} />
              <Route path=':id' element={<Typography>EL</Typography>} />
            </Route>
            <Route path='vendor_feedback' element={<VendorFeedback/>}>
              <Route index element={<VendorFeedbackTable limit={4}/>} />
              <Route path=':id' element={<VendorFeedbackView/>} />
            </Route>
          </Route>
          {/* 404 */}
          <Route path='*' element={<Typography variant='h1'>404</Typography>}/>
        </Routes>
      </Box>
  );
};

export default MainPage;
