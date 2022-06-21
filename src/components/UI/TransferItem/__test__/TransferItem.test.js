import * as PageContext from "../../../../store/page-context";
import customRender from "../../../../util/customRender";
import {render, screen} from "@testing-library/react";
import TransferItem from "../TransferItem";

let mockIsLoading = true;
let mockedSendRequest = jest.fn()

jest.mock('../../../../hooks/use-http', () => {
    return () => ({
        isLoading: mockIsLoading,
        error: null,
        sendRequest: mockedSendRequest
    })
})

let fileInfo = {
    txHash: "ABC",
    file: "ABC",
    startDate: "ABC",
    endDate: 'ABC',
    senderAccount: "ABC",
    receiverAccount: 'ABC',
    linearId: '123',
    title: 'ABC',
    senderHost: 'ABC',
    isReceived: 'ABC'
}

test('renders loading warning', () => {
    const mockContext = {
        isLoggedIn: true,
        user: {
            name: 'Ali'
        }
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)
    mockIsLoading = true

    customRender(<TransferItem fileInfo={fileInfo} />, mockContext);
    const loading = screen.getByText(/Dosya İndiriliyor.../i);

    expect(loading).toBeInTheDocument();
})

test('renders TransferItem', () => {
    const mockContext = {
        isLoggedIn: true,
        user: {
            name: 'Ali'
        }
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)
    mockIsLoading = false

    render(<TransferItem key='key-1' fileInfo={fileInfo} sentFile={true} />);
    const abc = screen.getAllByText('ABC')
    const dateTitle = screen.getByText('Dosya Kullanım Tarihi:')
    const transferIdTitle = screen.getByText('Transfer ID:')
    const transferId = screen.getByText('123')
    const sender = screen.getByText('Gönderen:')
    const sentText = screen.getByText('İndirildi')

    expect(dateTitle).toBeTruthy()
    expect(transferIdTitle).toBeTruthy()
    expect(transferId).toBeTruthy()
    expect(sender).toBeTruthy()
    expect(sentText).toBeTruthy()
    expect(abc).toBeTruthy();
})

test('renders TransferItem when isReceived false', () => {
    const mockContext = {
        isLoggedIn: true,
        user: {
            name: 'Ali'
        }
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)
    mockIsLoading = false
    fileInfo.isReceived = false

    render(<TransferItem key='key-1' fileInfo={fileInfo} sentFile={true} />);
    const sentText = screen.getByText('Henüz İndirilmedi')

    expect(sentText).toBeTruthy()
})