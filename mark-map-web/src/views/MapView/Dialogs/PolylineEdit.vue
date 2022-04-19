<template>
  <el-dialog
    v-model="editingStore.editing"
    :title="editingStore.dialogTitle"
    width="400px"
    @open="onOpen"
    @close="editingStore.$reset()"
  >
    <el-form
      :model="editingStore"
      :rules="rules"
      label-width="60px"
      ref="formRef"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="editingStore.name"></el-input>
      </el-form-item>

      <el-form-item label="样式" prop="icon">
        <el-popover placement="right" width="240px" v-model:visible="popShow">
          <template #reference>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="100"
                height="100"
              >
                <polyline points="0,75,33,35,66,65,100,25" :style="svgStyle" />
              </svg>
              <el-button size="small" @click="popShow = !popShow">
                修改样式
              </el-button>
            </div>
          </template>
          <template #default>
            <div>
              <div class="my-[15px]">
                颜色：
                <el-color-picker
                  size="small"
                  v-model="editingStore.symbol.lineColor"
                  :predefine="predefineColors"
                  @change="
                    val =>
                      val ||
                      (editingStore.symbol.lineColor = predefineColors[0])
                  "
                />
              </div>
              <div class="flex my-[15px]">
                <span> 宽度： </span>
                <el-input
                  type="number"
                  size="small"
                  style="width: 150px"
                  v-model="editingStore.symbol.lineWidth"
                  :max="20"
                  :min="1"
                  @change="
                    v => {
                      if (v > 20) editingStore.symbol.lineWidth = 20;
                      if (v < 1) editingStore.symbol.lineWidth = 1;
                    }
                  "
                ></el-input>
              </div>
              <div class="my-[15px]">
                <span>线型：</span>
                <el-radio-group v-model="lineDash">
                  <el-radio :label="false">实线</el-radio>
                  <el-radio :label="true">虚线</el-radio>
                </el-radio-group>
              </div>
              <div class="my-[25px]">
                <el-button
                  size="small"
                  style="float: right"
                  @click="popShow = false"
                >
                  确定
                </el-button>
              </div>
            </div>
          </template>
        </el-popover>
      </el-form-item>

      <!--      tags    -->
      <el-form-item label="标签" prop="tags">
        <el-tag
          v-for="(tag, index) in editingStore.tags"
          :key="'tag' + index"
          closable
          class="mr-[2px]"
          @close="removeListItem(editingStore.tags, tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="tags.inputVisible"
          ref="tagInputRef"
          v-model="tags.inputValue"
          size="small"
          style="width: 70px"
          @keyup.enter="tags.handleInputConfirm"
          @blur="tags.handleInputConfirm"
        />
        <el-button v-else size="small" @click="tags.showInput">
          + 新增
        </el-button>
      </el-form-item>

      <!--      table   -->
      <el-form-item label="属性">
        <div class="border border-gray-200 rounded-[4px] p-[2px] w-full">
          <div class="flex">
            <span class="w-1/2 text-center">属性名</span>
            <span class="w-1/2 text-center">属性值</span>
          </div>
          <div
            class="flex"
            v-for="(item, index) in editingStore.table"
            :key="'table' + index"
          >
            <el-button
              size="small"
              @click="
                editingStore.table.splice(index + 1, 0, { key: '', value: '' })
              "
            >
              +
            </el-button>
            <el-input class="w-1/2" size="small" v-model="item.key"></el-input>
            <el-input
              class="w-1/2"
              size="small"
              v-model="item.value"
            ></el-input>
            <el-button
              size="small"
              @click="
                editingStore.table.length === 1
                  ? (editingStore.table = [{ key: '', value: '' }])
                  : editingStore.table.splice(index, 1)
              "
            >
              -
            </el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancelClick">取消</el-button>
        <el-button type="primary" @click="onConfirmClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch, watchEffect } from 'vue';
import { getMap } from '@/components/VMap/mapInstance.js';
import { useEditingPolylineStore } from '@/store/editingFeature.js';
import { removeListItem } from '@/utils/removeListItem.js';

const editingStore = useEditingPolylineStore();

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
]);

const popShow = ref(false);
watchEffect(() => {
  if (!editingStore.editing) popShow.value = false;
});

const lineDash = computed({
  get() {
    return !!editingStore.symbol.lineDasharray;
  },
  set(val) {
    if (val) {
      editingStore.symbol.lineDasharray = [5, 5];
    } else {
      editingStore.symbol.lineDasharray = null;
    }
  }
});

const svgStyle = computed(() => {
  let str = '';
  str += `fill: white;`;
  str += `stroke: ${editingStore.symbol.lineColor};`;
  str += `stroke-width: ${editingStore.symbol.lineWidth};`;
  if (editingStore.symbol.lineDasharray) str += 'stroke-dasharray: 5 5;';
  return str;
});

async function onOpen() {
  editingStore.symbol = {
    lineColor: predefineColors.value[0],
    lineWidth: 3,
    lineDasharray: null,
    ...editingStore.symbol
  };
}

const rules = reactive({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
});
const formRef = ref(null);

async function onConfirmClick() {
  const [err] = await window.to(formRef.value.validate());
  if (err) return;
  const map = getMap();
  if (editingStore.id) {
    await map.mm.editPolyline(editingStore);
  } else {
    await map.mm.addPolyline(editingStore);
  }
  onCancelClick();
}

function onCancelClick() {
  const map = getMap();
  map.resetCursor();
  editingStore.$reset();
}

// tags编辑
const tagInputRef = ref();
const tags = reactive({
  inputVisible: false,
  inputValue: '',
  handleInputConfirm: () => {
    if (tags.inputValue) {
      editingStore.tags.push(tags.inputValue);
    }
    tags.inputVisible = false;
    tags.inputValue = '';
  },
  showInput: () => {
    tags.inputVisible = true;
    nextTick(() => {
      tagInputRef.value.input.focus();
    });
  }
});
</script>

<style scoped></style>
