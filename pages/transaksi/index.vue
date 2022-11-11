<template>
  <div class="shadow rounded-md py-4">
    <div class="px-4">
      <p class="text-lg font-bold">List Transaksi</p>
    </div>
    <div class="px-4 mt-6 grid grid-cols-4 gap-2">
      <input
        v-model="search.trx_id"
        class="
          border
          w-full
          rounded-md
          focus:outline-none focus:border-primary-dark
          px-4
          py-2
        "
        placeholder="Filter By Trx ID"
      />
      <input
        v-model="search.ref_id"
        class="
          border
          w-full
          rounded-md
          focus:outline-none focus:border-primary-dark
          px-4
          py-2
        "
        placeholder="Filter By Reff ID"
      />
      <input
        v-model="search.code"
        class="
          border
          w-full
          rounded-md
          focus:outline-none focus:border-primary-dark
          px-4
          py-2
        "
        placeholder="Filter By Kode Produk"
      />
      <input
        v-model="search.member_id"
        class="
          border
          w-full
          rounded-md
          focus:outline-none focus:border-primary-dark
          px-4
          py-2
        "
        placeholder="Filter By Member ID"
      />
      <input
        v-model="search.tujuan"
        class="
          border
          w-full
          rounded-md
          focus:outline-none focus:border-primary-dark
          px-4
          py-2
        "
        placeholder="Filter By Tujuan"
      />
      <client-only>
        <DatePicker
          v-model="datepick"
          type="date"
          range
          :disabled-date="notBeforeToday"
          placeholder="Filter tanggal"
          style="width: 100%"
        />
      </client-only>
      <select
        v-model="search.status"
        class="
          border
          rounded-md
          w-full
          focus:outline-none focus:border-primary-dark
          px-4
          py-2
        "
      >
        <option value="" selected disabled>Filter By Status</option>
        <option value="0">Pending</option>
        <option value="1">Sukses</option>
        <option value="2">Gagal</option>
      </select>
      <div class="flex gap-x-2">
        <button
          class="
            bg-primary-default
            w-full
            px-4
            py-2
            text-white
            rounded-md
            focus:outline-none
          "
          @click.prevent="getTransaksi()"
        >
          <i class="fas fa-search"></i> Cari
        </button>
        <button
          class="
            bg-primary-light
            w-full
            px-4
            py-2
            text-primary-dark
            border border-primary-dark
            rounded-md
            focus:outline-none
          "
          @click.prevent="
            ;(search = {
              trx_id: '',
              ref_id: '',
              code: '',
              produk_id: '',
              operator_id: '',
              member_id: '',
              tujuan: '',
              status: '',
              start_at: '',
              end_at: '',
            }),
              (page = 1),
              (total = 0),
              (datepick = ''),
              getTransaksi()
          "
        >
          <i class="fas fa-redo"></i> Reset
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="mt-2 w-full">
        <thead class="bg-gray-300">
          <tr class="text-sm font-bold">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">
              <p>Trx ID</p>
              <p>Ref ID</p>
            </td>
            <td class="py-4 px-4">
              <p>Member</p>
              <p>Member ID</p>
            </td>
            <td class="py-4 px-4">
              <p>Produk</p>
              <p>Kode</p>
            </td>
            <td class="py-4 px-4">
              <p>Tujuan</p>
              <p>Server ID</p>
            </td>
            <td class="py-4 px-4">SN</td>
            <td class="py-4 px-4">
              <p>Harga</p>
              <p>Harga Jual</p>
            </td>
            <td class="py-4 px-4">Status</td>
            <td class="py-4 px-4">
              <p>Tgl dibuat</p>
              <p>Tgl diubah</p>
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr>
            <td colspan="10">
              <loader />
            </td>
          </tr>
        </tbody>
        <tbody v-if="!loading && empty">
          <tr>
            <td colspan="10" class="text-center p-4">
              <p>Data Tidak Ditemukan!</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!loading && !empty">
          <tr
            v-for="(t, i) in transaksi"
            :key="i"
            class="border-b text-sm hover:bg-gray-100"
          >
            <td class="p-4">{{ t.transaksi.id }}</td>
            <td>
              <p class="font-bold">{{ t.transaksi.trx_id }}</p>
              <p class="text-xs">{{ t.transaksi.reff_id }}</p>
            </td>
            <td>
              <p class="font-bold">{{ t.member.nama }}</p>
              <p class="text-xs">{{ t.member.member_id }}</p>
            </td>
            <td>
              <p>{{ t.produk.nama }}</p>
              <p class="text-xs">{{ t.produk.code }}</p>
            </td>
            <td>
              <p>{{ t.transaksi.tujuan }}</p>
              <p class="text-xs">{{ t.transaksi.server_id }}</p>
            </td>
            <td>{{ t.transaksi.sn }}</td>
            <td>
              <p>{{ t.transaksi.price | rupiah }}</p>
              <p>{{ t.transaksi.price_sell | rupiah }}</p>
            </td>
            <td>
              <p
                :class="
                  t.transaksi.status === 0
                    ? 'text-yellow-500'
                    : t.transaksi.status === 1
                    ? 'text-green-500'
                    : 'text-red-500'
                "
                class="font-bold uppercase"
              >
                {{
                  t.transaksi.status === 0
                    ? 'Pending'
                    : t.transaksi.status === 1
                    ? 'Sukses'
                    : 'Gagal'
                }}
              </p>
            </td>
            <td>
              <p>
                {{
                  $moment(t.transaksi.created_at).format(
                    'DD MMM YYYY | HH:mm:ss'
                  )
                }}
              </p>
              <p>
                {{
                  t.transaksi.updated_at === '0000-00-00 00:00:00'
                    ? '-'
                    : $moment(t.transaksi.updated_at).format(
                        'DD MMM YYYY | HH:mm:ss'
                      )
                }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-4 flex justify-center items-center gap-2">
        <p class="text-sm">Total Page: {{ totalPage }} Page</p>
        <div>
          <button
            :disabled="page === 1"
            :class="page === 1 ? 'text-gray-500' : ''"
            class="focus:outline-none"
            @click.prevent="page = page - 1"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          {{ page }}
          <button
            :disabled="page === totalPage"
            :class="page === totalPage ? 'text-gray-500' : ''"
            class="focus-outline-none"
            @click.prevent="page = page + 1"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div>
          <input
            v-model="page"
            class="
              border
              rounded-md
              focus:outline-none
              px-4
              py-2
              w-20
              focus:border-bk-blue
            "
          />
          <select
            v-model="limit"
            class="
              border
              rounded-md
              focus:outline-none
              px-4
              py-2
              focus:border-bk-blue
            "
          >
            <option :value="30">30/page</option>
            <option :value="50">50/page</option>
            <option :value="100">100/page</option>
          </select>
        </div>
        <p class="text-sm">Total Data: {{ total }} Data</p>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  name: 'TransaksiPage',
  components: { DatePicker },
  data() {
    return {
      loading: false,
      empty: false,
      transaksi: [],
      page: 1,
      total: 0,
      limit: 30,
      totalPage: 0,
      datepick: '',
      search: {
        trx_id: '',
        ref_id: '',
        code: '',
        produk_id: '',
        operator_id: '',
        member_id: '',
        tujuan: '',
        status: '',
        start_at: '',
        end_at: '',
      },
    }
  },
  watch: {
    datepick: {
      handler(v) {
        if (v[0] !== null) {
          this.search.start_at = this.$moment(v[0]).format('YYYY-MM-DD')
          this.search.end_at = this.$moment(v[1]).format('YYYY-MM-DD')
        } else {
          this.search.start_at = ''
          this.search.end_at = ''
        }
      },
    },
    page: {
      handler(v) {
        if (v !== '' && v !== '0') {
          this.getTransaksi()
        }
      },
    },
    limit: {
      handler(v) {
        this.page = 1
        this.getTransaksi()
      },
    },
  },
  async mounted() {
    await this.getTransaksi()
  },
  methods: {
    notBeforeToday(date) {
      return date > new Date(new Date().setHours(0, 0, 0, 0))
    },
    async getTransaksi() {
      this.loading = true
      const payload = {
        id: 0,
        trx_id: this.search.trx_id,
        ref_id: this.search.ref_id,
        code: this.search.code,
        produk_id: this.search.produk_id,
        operator_id: this.search.operator_id,
        member_id: this.search.member_id,
        tujuan: this.search.tujuan,
        status: this.search.status,
        start_at: this.search.start_at,
        end_at: this.search.end_at,
        limit: this.limit,
        page: this.page,
        total: this.total,
      }
      const res = await this.$axios('POST', '/api/transaksi/list', payload)
      this.loading = false
      if (res.status) {
        this.empty = false
        this.transaksi = res.data.Data
        this.page = res.data.Pages
        this.totalPage = res.data.TotalPages
        this.total = res.data.TotalData
      } else {
        this.empty = true
        this.transaksi = []
        this.$toast.error(res.error_msg)
      }
    },
  },
}
</script>
