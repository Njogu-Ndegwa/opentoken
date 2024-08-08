
import './App.css';
// import Home from './pages/home';
import { useQuery, gql } from '@apollo/client';
import { ClientPage } from './pages/clients';
import { useFormik } from 'formik';
import { useLazyGetItembyOemItemIdQuery } from './pages/queries';
import { useLazyGetAllClientItemsQuery } from './pages/queries';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { createSingleItemMutation } from './pages/mutations';
import { initializeOpenTokenCodeGenMutation } from './pages/mutations';
import { initializeOpenTokenCodeDecoderMutation } from './pages/mutations';
import { handleGQLErrors } from "./utils/gqlErrors"
import Notiflix from 'notiflix';
import { 
  updateOpenTokenCodeDecoderStateMutation, 
  updateOpenTokenCodeGenStateMutation, 
  deductDeviceCalenderDaysMutation } from './pages/mutations';

function App() {
  const [itemData, setData] = useState([])
  const [selectedItem, setSelectedItem] = useState('');
  const [openTokenCodeGen, setOpenTokenCodeGen] = useState()
  const [openTokenCodeDec, setOpenTokenCodeDec] = useState()
  const [deviceState, setDeviceState] = useState()
  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
    setOpenTokenCodeDec()
    setOpenTokenCodeGen()
  };
  const [
    getClientItems,
    {
      data,
      fetchMore: fetchMoreClientItems,
      loading,
      refetch: refetchClientItems,
      error: clientError,
    },
  ] = useLazyGetAllClientItemsQuery({
    first: 20,
    clientId: "61811cc2bf5a3f81fbeb5d41",
    assetaccount: false,
    queryorder: "DESC",
    isOpenTokenSimulator: true

  });

  const [getItem, { data: item, loading: getItemLoading, refetch }] = useLazyGetItembyOemItemIdQuery(
    { oemItemId: selectedItem })

  const [deductDeviceCalenderDays, deductDeviceCalenderDaysOpts] = useMutation(deductDeviceCalenderDaysMutation, {
    onCompleted: (data) => {
      refetchClientItems && refetchClientItems();
    },
    onError: (error) => {
      // handleGQLErrors(notify, err);
      Notiflix.Notify.failure(error.message)
    },
  })


  const [createSingleItem, createItemOpts] = useMutation(createSingleItemMutation, {
    onCompleted: (data) => {
      refetchClientItems && refetchClientItems();
    },
    onError: (err) => {
      // handleGQLErrors(notify, err);

    },
  })

  useEffect(() => {
    getClientItems()
  }, [])

  useEffect(() => {
    let dataa = data?.getAllClientItems?.page?.edges

    setData(dataa)
    if (dataa) {
      setSelectedItem(dataa[0]?.node?.oemItemID)
    }
    // setSelectedItem();
  }, [data])

  useEffect(() => {
    if (selectedItem) {
      getItem()
    }
  }, [selectedItem])

  useEffect(() => {

    console.log(item, " Item------94-----")
    if (item?.getItembyOemItemId?.openTokencodeGen) {
      console.log(item?.getItembyOemItemId?.openTokenCodeDecoder, "-----80----")
      setOpenTokenCodeGen(item?.getItembyOemItemId?.openTokencodeGen)
    }

    if (item?.getItembyOemItemId?.openTokenCodeDecoder) {
      console.log(item?.getItembyOemItemId?.openTokenCodeDecoder, "-----81----")
      setOpenTokenCodeDec(item?.getItembyOemItemId?.openTokenCodeDecoder)
      console.log(item?.getItembyOemItemId?.openTokenCodeDecoder, "-----81----")
    }
  }, [item])


  const handleCreateSimulatorItem = async () => {
    setOpenTokenCodeDec()
    setOpenTokenCodeGen()
    await createSingleItem({
      variables: {
        createItemInput: {
          idString: "",
          oemItemID: "TEST2407xxxxxx",
          oemID: "OVES",
          itembatchId: "669a7d3ea4df8dce99ec3c30",
          itemfirmwareId: "6177f7dd5f868905bb1f5e76",
          codegeneratorId: "",
          totalProducts: 1,
          itemFleetId: "669a7d8ba4df8dce99ec3c31"
        },
      },
    });

  }
  const formik = useFormik({
    initialValues: {
      tokenType: '',
      tokenValue: '',
    },
    onSubmit: (values) => {
      if (selectedItem) {
        let payload = {
          token_value: Number(values?.tokenValue),
          token_type: values?.tokenType,
          secret_key: openTokenCodeGen?.secret_key,
          starting_code: openTokenCodeGen?.starting_code,
          max_count: Number(openTokenCodeGen.max_count)
        }
        updateOpenTokenData({
          variables: {
            updateTokenDataInput: {
              ...payload,
              oem_item_id: selectedItem,
            }
          }
        })
      } else {
        Notiflix.Notify.failure("Select Item First")
      }
    },
  });

  const decodeForm = useFormik({
    initialValues: {
      token: '',
    },
    onSubmit: (values) => {
      let payload = {
        token: values.token,
        secret_key: openTokenCodeDec?.secret_key,
        starting_code: openTokenCodeDec?.starting_code,
        max_count: Number(openTokenCodeDec?.max_count),
        used_count: Number(openTokenCodeDec?.used_count)
      }
      updateOpenTokenDecoderData({
        variables: {
          updateOpenTokenDecoderInput: {
            ...payload,
            oem_item_id: selectedItem
          }
        }
      })
      console.log('Token:', values.token);
    },
  });

  const [intializeOpenTokenCodeGen, inializeCodeGenOpt] = useMutation(
    initializeOpenTokenCodeGenMutation,
    {
      onCompleted: (data) => {
        refetch && refetch();
        Notiflix.Notify.success("Item Encoder Initialized Successfully")
      },
      onError: (error) => {
        Notiflix.Notify.failure(error.message)
      }
    }
  );

  const [intializeOpenTokenCodeDecoder, inializeCodeDecOpt] = useMutation(
    initializeOpenTokenCodeDecoderMutation,
    {
      onCompleted: (data) => {
        refetch && refetch();
        Notiflix.Notify.success("Item Encoder Initialized Successfully")
      },
      onError: (error) => {
        Notiflix.Notify.failure(error.message)
      }
    }
  );

  const [updateOpenTokenData, updateOpenTokenDataOpts] = useMutation(updateOpenTokenCodeGenStateMutation, {
    onCompleted: async (data) => {
      Notiflix.Notify.success("Encoder State Updated successfully")
      refetch && refetch()
    },
    onError: (err) => {
      Notiflix.Notify.failure(err.message)
    }
  });

  const [updateOpenTokenDecoderData, updateOpenTokenDecoderDataOpts] = useMutation(updateOpenTokenCodeDecoderStateMutation, {
    onCompleted: async (data) => {

      Notiflix.Notify.success("Decoder State Updated successfully")
      refetch && refetch()
    },
    onError: (err) => {
      Notiflix.Notify.failure(err.message)
    }
  });
  const handleInitializeItem = () => {
    if (selectedItem) {
      intializeOpenTokenCodeGen({
        variables: {
          initializeOpenTokenCodeGenInput: {
            oem_item_id: selectedItem,
            max_count: 0,
            secret_key: "0123456789abcdef0123456789abcdef",
            starting_code: "123456789",
            used_count: 0
          }
        }
      })
    }
  }

  const handleInitializeItemDecoder = () => {
    if (selectedItem) {
      intializeOpenTokenCodeDecoder({
        variables: {
          initializeOpenTokenCodeGenInput: {
            oem_item_id: selectedItem,
            max_count: 0,
            secret_key: "0123456789abcdef0123456789abcdef",
            starting_code: "123456789",
            used_count: 0
          }
        }
      })
    }
  }
  const handleTokenClick = (token) => {
    decodeForm.setFieldValue('token', token);
  };

  const handleDeductDeviceState = () => {
    deductDeviceCalenderDays({
      variables: {
        deductDeviceCalenderDaysInput: {
          oem_item_id: selectedItem
        }
      }
    })
  }

  return (

    <div className='section-container'>
      <div className='line up'> <p>Open Chanel</p></div>
      <div className='line'></div>
      <div className='line down'> <p>Shared Secrets</p></div>
      <div className='lower-section lower-m'>
        <h2 className='header'>Device Data</h2>
        <p> <span className='span-l'>Secret Key:</span>  <span className='span-r'>0123456789abcdef0123456789abcdef</span></p>
        <hr></hr>
        <p> <span className='span-l'>Starting Code:</span>  <span className='span-r'>123456789</span></p>
        <hr></hr>
        <p> <span className='span-l'>Max Count:</span>  <span className='span-r'>0</span></p>
        <hr></hr>
        <p> <span className='span-l'>Used Count:</span>  <span className='span-r'>0</span></p>
        <hr></hr>

        <div className='lower-buttons'>

          <div>
            {/* <button onClick={handleInitializeItem} className='share'>
              {inializeCodeGenOpt.loading ? "Loading..." : "Share"}
            </button> */}
          </div>
          <div className='middle-buttons'>
            <div >
              <label for="cars" style={{ display: "block" }}>Choose an item:</label>
              <select
                style={{ width: "100%" }}
                name="items"
                id="items"
                disabled={loading || createItemOpts.loading}
                onChange={handleSelectChange}
                value={selectedItem}
              >
                {(loading || createItemOpts.loading) ? (
                  <option>Loading...</option>
                ) : (
                  itemData?.map((itemEdge) => (
                    <option key={itemEdge.node._id} value={itemEdge.node.oemItemID}>
                      {itemEdge.node.oemItemID}
                    </option>
                  ))
                )}
              </select>
            </div>
            <button onClick={handleCreateSimulatorItem} style={{ width: "100%", }}>
            {createItemOpts.loading ? "Loading..." : "New"}
            </button>
          </div>
          <div>

            {/* <button className='share' onClick={handleInitializeItemDecoder}>
              {inializeCodeDecOpt.loading ? "Loading..." : "Share"}
            </button> */}
          </div>
        </div>
      </div>
      <div className='section section-l'>
        <div className='upper-section'>
          <div className='input-container'>
            <div className='header-section'>
              <p>Encoder</p>
            </div>
            <form className='input' onSubmit={formik.handleSubmit}>
              <label htmlFor="tokenType" style={{ display: "block" }}>Token Type:</label>
              <select
                style={{ width: "100%" }}
                name="tokenType"
                id="tokenType"
                onChange={formik.handleChange}
                value={formik.values.tokenType}
              >
                <option value="">Select a token type</option>
                <option value="ADD_TIME">ADD_TIME</option>
                <option value="SET_TIME">SET_TIME</option>
                <option value="DISABLE_PAYG">DISABLE_PAYG</option>
                <option value="COUNTER_SYNC">COUNTER_SYNC</option>
              </select>

              <label htmlFor="tokenValue" style={{ display: "block" }}>Token Value:</label>
              <input
                placeholder='Enter Token Value'
                style={{ width: "97%" }}
                name="tokenValue"
                onChange={formik.handleChange}
                value={formik.values.tokenValue}
              />

              <button className='input-button' type="submit">{updateOpenTokenDataOpts.loading ? "Loading..." : "Encode"}</button>
            </form>
          </div>
          <div className='table'>
            <div className='header-section'>
              <p>Generated Token</p>
            </div>
            <ClientPage historyData={openTokenCodeGen?.openTokenCodeHistory} isLoading={loading || getItemLoading} onTokenClick={handleTokenClick} />
          </div>
        </div>
        <div className='lower-section lower-l'>
          <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "10px", paddingLeft: "10px" }}>
            <h2 className='header'>Encoder State</h2>
            <div className='share-container'>
              <button className='share' onClick={handleInitializeItem}>
                {inializeCodeGenOpt.loading ? "Loading..." : "Get Secrets"}
              </button>
            </div>
          </div>

          <p> <span className='span-l'>Oem Item Id:</span>  <span className='span-r'>{selectedItem || "-"}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Token:</span>  <span className='span-r'>{openTokenCodeGen?.token || "-"}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Token Type:</span>  <span className='span-r'>{openTokenCodeGen?.token_type || "-"}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Token Value:</span>  <span className='span-r'>{openTokenCodeGen?.token_value || "-"}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Max Count:</span>  <span className='span-r'>{openTokenCodeGen?.max_count}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Secret Key:</span>  <span className='span-r'>{openTokenCodeGen?.secret_key}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Starting Code:</span>  <span className='span-r'>{openTokenCodeGen?.starting_code}</span></p>
          <hr></hr>

        </div>
      </div>
      <div className='section section-r'>
        <div className='upper-section'>
          <div className='input-container'>
            <div className='header-section'>
              <p>Decoder</p>
            </div>
            <form className='input' onSubmit={decodeForm.handleSubmit}>
              <label for="cars" style={{ display: "block" }}>Token:</label>
              <input
                placeholder='Enter Token'
                style={{ width: "97%" }}
                name="token"
                onChange={decodeForm.handleChange}
                value={decodeForm.values.token}
              />

              <button className='input-button' >{updateOpenTokenDecoderDataOpts.loading ? "Loading..." : "Decode"}</button>
            </form>
          </div>
          <div className='table'>
            <div className='header-section'>
              <p>Accepted Token </p>
            </div>
            <ClientPage historyData={openTokenCodeDec?.openTokenCodeHistory} isLoading={loading || getItemLoading} />
          </div>
        </div>
        <div className='lower-section lower-r'>
          <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "10px", paddingLeft: "10px" }}>
            <h2 className='header'>Decoder State</h2>
            <div className='share-container'>
              <button className='share' onClick={handleInitializeItemDecoder}>
                {inializeCodeDecOpt.loading ? "Loading..." : "Get Secrets"}
              </button>
            </div>
          </div>

          <p> <span className='span-l'>Oem Item Id:</span>  <span className='span-r'>{selectedItem}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Token:</span>  <span className='span-r'>{openTokenCodeDec?.token || "-"}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Token Type:</span>  <span className='span-r'>{openTokenCodeDec?.token_type || "-"}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Token Value:</span>  <span className='span-r'>{openTokenCodeDec?.token_value || "-"}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Used Count:</span>  <span className='span-r'>{openTokenCodeDec?.used_count}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Max Count:</span>  <span className='span-r'>{openTokenCodeDec?.max_count}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Secret Key:</span>  <span className='span-r'>{openTokenCodeDec?.secret_key || "-"}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Starting Code:</span>  <span className='span-r'>{openTokenCodeDec?.starting_code || "-"}</span></p>
          <hr></hr>
        </div>
        <div className='device-state '>
        <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "10px", paddingLeft: "10px" }}>
            <h2 className='header'>Device State</h2>
            <div className='share-container'>
              <button className='share calender' onClick={handleDeductDeviceState}>
                {deductDeviceCalenderDaysOpts.loading ? "Loading..." : "Calender day"}
              </button>
            </div>
          </div>
          <p> <span className='span-l'>Remaining Credit Days:</span>  <span className='span-r'>{openTokenCodeDec?.remaining_credit_days}</span></p>
          <hr></hr>
          <p> <span className='span-l'>PayG Enabled:</span>  <span className='span-r'>{openTokenCodeDec?.payg_enabled?.toString()}</span></p>
          <hr></hr>
          <p> <span className='span-l'>Output Enabled:</span>  <span className='span-r'>{openTokenCodeDec?.output_enabled?.toString()}</span></p>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}

export default App;
