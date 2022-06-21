import {screen} from '@testing-library/react';
import customRender from "../../../../util/customRender";
import * as PageContext from "../../../../store/page-context";
import SentFiles from "../SentFiles";

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

    customRender(<SentFiles />, mockContext);
    const loading = screen.getByText(/Giden Dosyalar yükleniyor.../i);

    expect(loading).toBeInTheDocument();
});

test('renders sent files when service return empty list', () => {
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

    customRender(<SentFiles />, mockContext);
    const emptyFileList = screen.getByText(/Henüz hiç dosya göndermediniz. Dosya göndermek için dosya gönder sekmesine geçebilirsiniz./i);

    expect(emptyFileList).toBeInTheDocument();
});

test('renders sent files when service return full list', () => {
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
                        senderAccount: mockContext.user.cordaKey,
                        receiverAccount: 'ABC',
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

    customRender(<SentFiles />, mockContext);
    const emptyFileList = screen.getAllByText(/ABC/i);
    const sentMsg = screen.getByText(/Henüz İndirilmedi/i);

    expect(emptyFileList).toBeTruthy();
    expect(sentMsg).toBeTruthy()
});
