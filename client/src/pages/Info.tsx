import * as React from 'react';

import ImageUploader from '../components/imageuploader';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Yellow Tails', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

type FormValues = {
  type: string;
  origin: string;
  born: null;
  died?: string;
  remarks?: string;
  photo?: FileList;
};

export default function Info() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [origin, setOrigin] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setOrigin(event.target.value);
  };

  const [bornDate, setBornDate] = React.useState<Dayjs | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('Form Data:', data);
    const formData = new FormData();

    formData.append('type', data.type);
    formData.append('batch', data.origin); // assuming 'origin' is your 'batch'
    formData.append('born', data.born || '');
    formData.append('died', data.died || '');
    formData.append('remarks', data.remarks || '');
    if (data.photo && data.photo.length > 0) {
      formData.append('photo', data.photo[0]);
    }

    try {
      const res = await fetch('http://localhost:5001/api/info', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      console.log('Saved:', result);
    } catch (err) {
      console.error('Failed to submit:', err);
    }
  };

  return (
    <>
      <ImageUploader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                {...field}
                label="Type Description"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="origin"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="origin-label">Origin</InputLabel>
                <Select
                  labelId="origin-label"
                  label="Origin"
                  {...field}
                  value={field.value ?? ''} // keep controlled
                >
                  <MenuItem value="domestic">Domestic</MenuItem>
                  <MenuItem value="store">Store</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="born"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Born/Acquired Date"
                  value={field.value}
                  onChange={(newVal) => field.onChange(newVal)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="remarks"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                {...field}
                label="Remarks"
                variant="outlined"
              />
            )}
          />

          <Button variant="contained" type="submit">
            Add
          </Button>
        </Stack>
      </form>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Origin</TableCell>
              <TableCell align="right">Born/Aquired Date</TableCell>
              <TableCell align="right">Death Date</TableCell>
              <TableCell align="right">Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}
