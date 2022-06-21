import {screen} from '@testing-library/react';
import customRender from "../../../../util/customRender";
import * as PageContext from "../../../../store/page-context";
import TransferDetails from "../TransferDetails";

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

    customRender(<TransferDetails />, mockContext);
    const loading = screen.getByText(/Transfer bilgileri yükleniyor.../i);

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

    customRender(<TransferDetails />, mockContext);
    const emptyFileList = screen.getByText(/Dosya ayrıntıları yüklenemedi/i);

    expect(emptyFileList).toBeInTheDocument();
});

test('renders sent files when service return full list', () => {
    mockIsLoading = false
    let mockedResponseHandler = () => {
        return {
            transferHistory: [{
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
        }
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)

    customRender(<TransferDetails />, mockContext);
    const emptyFileList = screen.getAllByText(/ABC/i);
    const sentMsg = screen.getByText(/Gönderildi/i);

    expect(emptyFileList).toBeTruthy();
    expect(sentMsg).toBeTruthy()
});
