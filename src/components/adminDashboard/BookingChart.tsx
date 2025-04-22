import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlyStats {
  month: string;
  booking_count: number;
  revenue: number;
}

interface BookingChartProps {
  data: MonthlyStats[];
}

const BookingChart = ({ data }: BookingChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [value, "Bookings"]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar
                dataKey="booking_count"
                fill="#8884d8"
                name="Bookings"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingChart;
