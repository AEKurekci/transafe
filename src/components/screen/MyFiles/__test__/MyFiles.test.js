import {screen} from '@testing-library/react';
import customRender from "../../../../util/customRender";
import * as PageContext from "../../../../store/page-context";
import MyFiles from "../MyFiles";

let mockIsLoading = true;
let mockedSendRequest = jest.fn()

jest.mock('../../../../hooks/use-http', () => {
    return () => ({
        isLoading: mockIsLoading,
        error: null,
        sendRequest: mockedSendRequest
    })
})

test('renders loading files', () => {
    const mockContext = {
        isLoggedIn: true,
        user: {
            name: 'Ali'
        }
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)
    mockIsLoading = true

    customRender(<MyFiles />, mockContext);
    const loading = screen.getByText(/Gelen Dosyalar yükleniyor.../i);

    expect(loading).toBeInTheDocument();
});

test('renders my files when service return empty list', () => {
    const mockContext = {
        isLoggedIn: true,
        user: {
            name: 'İş Bankası',
            cordaKey: 'Isbank'
        }
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)
    mockIsLoading = false
    let mockedResponseHandler = jest.fn(() => [])
    mockedSendRequest = jest.fn(mockedResponseHandler, {})

    customRender(<MyFiles />, mockContext);
    const emptyFileList = screen.getByText(/Size henüz gelen bir dosya bulunmuyor. Dosya göndermek için dosya gönder sekmesine geçebilirsiniz./i);

    expect(emptyFileList).toBeInTheDocument();
});

test('renders my files when service return full list', () => {
    mockIsLoading = false
    let mockedResponseHandler = () => {
        return {
            myTransfers: [{
                ref:{
                    txhash: 'ABC'
                },
                state: {
                    data: {
                        file: 'ABC',
                        startDate: '12:12 21/06/2022',
                        endDate: '12:12 21/06/2022',
                        senderAccount: 'ABC',
                        receiverAccount: mockContext.user.cordaKey,
                        linearId: {id: '123'},
                        title: 'ABC',
                        senderHost: 'ABC',
                        isReceived: false
                    }
                }
            }]
        }
    }
    mockedSendRequest = (handler) => {
        handler(mockedResponseHandler())
    }
    const mockContext = {
        isLoggedIn: true,
        user: {
            name: 'İş Bankası',
            cordaKey: 'Isbank'
        },
        isErrorModalOpen: false,
        setIsErrorModalOpen: (isErrorModalOpen) => {}
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)

    customRender(<MyFiles />, mockContext);
    const emptyFileList = screen.getAllByText(/ABC/i);
    const sentMsg = screen.getByText(/Henüz İndirilmedi/i);

    expect(emptyFileList).toBeTruthy();
    expect(sentMsg).toBeTruthy()
});
