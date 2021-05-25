import PensionDetail from './PensionDetail';
import renderer from 'react-test-renderer';
import {useGetTravellingData} from '../GetDataHook';

jest.mock("../GetDataHook", () => ({
  useGetTravellingData: jest.fn(),
}));

describe('PensionDetail', () => {
  it('renders correctly', () => {
    useGetTravellingData.mockReturnValueOnce({
      doctors: [],
      exchangeRates: [],
      exchangeRateTime: '',
    });
    const tree = renderer.create(<PensionDetail />);
    expect(tree).toMatchSnapshot();
  });
});
